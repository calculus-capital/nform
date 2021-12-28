import { PaymentTerms, Trade, TradeItem, Beneficiary, TradeType, Payment } from "./types"
import { traders } from "./constants"
import { getRandomArbitrary, getRandomInt, getRandomString, getRandomDate } from "../random"
import moment from "moment"
import {
  tradeStart,
  growth,
  averagePrice,
  averageQuantity,
  paymentTermsDelay,
  averageDelay,
  earlyPayments,
  margin,
  growthBias,
} from "./controls"

const randomTradeItem = (): TradeItem => {
  // TODO: sample from distributions
  const price = getRandomArbitrary(averagePrice / 2, averagePrice * 2)
  const quantity: number = getRandomInt(averageQuantity / 2, averageQuantity * 2)

  const item: TradeItem = {
    id: getRandomInt(10000000000, 99999999999),
    sku: getRandomString(5) + getRandomInt(1000000, 1999999).toString(),
    description: "",
    quantity: quantity,
    price: price * quantity,
    price_per_unit: price,
  }

  return item
}

const randomPaymentTerms = (date: Date): PaymentTerms => {
  const startDate = moment(date).startOf("month").add(getRandomInt(0, 10), "day")
  const dice = Math.random()

  let pt: PaymentTerms = {
    startDate: startDate.toDate(),
    maturity: startDate
      .add(dice < paymentTermsDelay[0] ? 1 : dice > paymentTermsDelay[0] ? 3 : 2, "month")
      .toDate(),
    merchant_discount: getRandomArbitrary(2, 5),
    credit_discount: getRandomArbitrary(2, 5),
  }
  return pt
}

const randomBeneficiary = (): Beneficiary => {
  const bene: Beneficiary = {
    id: getRandomInt(10000000000, 99999999999),
    name: traders[getRandomInt(0, traders.length)],
    bank_account: getRandomString(3) + getRandomInt(10000000, 99999999).toString(),
    ifsc: getRandomString(4) + getRandomInt(10000, 99999).toString(),
    split: 1,
  }

  return bene
}

const newPayment = (bene:Beneficiary, end:moment.Moment): Payment => {
  const payment: Payment = {
    id: getRandomInt(10000000000, 99999999999),
    date: end.toDate(),
    amount: 0,
    to: bene,
    credit: false,
    repaid: 0,
  }

  return payment
}

export const generateTradeLog = (from: Date): Trade[] => {
  var start = moment(from).startOf("month")
  var end = moment(from).startOf("month").subtract("2", "day")

  var starts: Date[] = []
  var ends: Date[] = []
  while (start.isBefore(moment())) {
    starts = [...starts, start.toDate()]
    ends = [...ends, end.toDate()]
    start = start.add("1", "month")
    end = end.add("1", "month")
  }

  var norders = tradeStart

  return starts.flatMap(start => {
    norders = norders + norders * growth * (Math.random() > 0.5 - growthBias ? 1 : 0 )
    if (norders === 0) norders = 1
    console.log("Generating " + Math.round(norders) + " orders for " + start.toDateString())

    let trades: Trade[] = Array(Math.round(norders))
      .fill(0)
      .flatMap((_, i) => {
        const terms = randomPaymentTerms(start)
        const items = [randomTradeItem()]
        const bene = randomBeneficiary()

        // const start = moment(terms.startDate)
        const end = moment(terms.maturity)
        const totalCost = items
          .map(i => {
            return i.price
          })
          .reduce((x, y) => x + y)

        const tradeType = Math.random() > (0.5-margin) ? TradeType.SALES : TradeType.PROCUREMENT
        var payments = [] as Payment[]

        if (tradeType === TradeType.SALES) {
          // loooong past
          if (end.diff(moment(), "days") < -1 * averageDelay) {
            // paid the merchant
            const p1 = newPayment(bene, end)

            p1.amount = totalCost
            p1.date = start

            if (Math.random() < earlyPayments) {
              // paid the merchant on some credit
              const p2 = newPayment(bene, moment(start))
              p2.amount = earlyPayments * totalCost
              p2.credit = true

              // repaid the credit after 30 days
              if (end.diff(moment(), "days") < -30) {
                p2.repaid = earlyPayments * totalCost
                p2.repaidDate = end.add(30, "day").toDate()
              }

              payments = [p1, p2]
            } else {
              payments = [p1]
            }
          } else {
            payments = []
          }
        } else if (tradeType === TradeType.PROCUREMENT) {
          // loooong past
          if (end.diff(moment(), "days") < -1 * averageDelay) {
            // paid the merchant
            const p1 = newPayment(bene, end)

            p1.amount = totalCost
            p1.date = start

            if (Math.random() < earlyPayments) {
              // paid the merchant on some credit
              const p2 = newPayment(bene, moment(start))
              p2.amount = earlyPayments * totalCost
              p2.credit = true

              // repaid the credit after 30 days
              if (end.diff(moment(), "days") < -30) {
                p2.repaid = earlyPayments * totalCost
                p2.repaidDate = end.add(30, "day").toDate()
              }

              payments = [p1, p2]
            } else {
              payments = [p1]
            }
          } else {
            payments = []
          }
        }

        // manufacturing usecases: procurement -> consumption -> production -> sales
        // trading usecases: procurement -> sales
        let item: Trade = {
          type: tradeType,
          items: items,
          terms: terms,
          beneficiaries: [bene],
          payments: payments,
        }

        if (item.type === TradeType.PROCUREMENT) {
          let conterms = { ...terms }
          conterms.startDate = moment(terms.maturity).add(getRandomInt(30, 90), "day").toDate()
          let consumption: Trade = {
            type: TradeType.CONSUMPTION,
            items: items,
            terms: conterms,
            beneficiaries: [bene],
            payments: payments,
          }
          return [item, consumption]
        } else if (item.type === TradeType.SALES) {
          let prodterms = terms
          prodterms.startDate = moment(terms.maturity).subtract(getRandomInt(30, 90), "day").toDate()
          let production: Trade = {
            type: TradeType.PRODUCTION,
            items: items,
            terms: prodterms,
            beneficiaries: [bene],
            payments: payments,
          }
          return [item, production]
        }
        return [item]
      })

    return trades
  })
}
