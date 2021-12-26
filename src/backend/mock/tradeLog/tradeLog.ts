
import { PaymentTerms, Trade, TradeItem, Beneficiary, TradeType, Payment } from './types';
import { traders } from './constants';
import { getRandomArbitrary, getRandomInt, getRandomString, getRandomDate } from '../random'
import moment from 'moment';

const randomTradeItem = (): TradeItem => {
  const price = getRandomArbitrary(10, 100)
  const quantity: number = getRandomInt(1, 100)

  const item: TradeItem = {
    id            : getRandomInt(10000000000, 99999999999),
    sku           : getRandomString(5) + getRandomInt(1000000, 1999999).toString(),
    description   : "",
    quantity      : quantity,
    price         : price * quantity,
    price_per_unit: price,
  }

  return item
}

const randomPaymentTerms = (): PaymentTerms => {

  let d = getRandomDate(moment().subtract(24, 'month').toDate(), moment().toDate())

  let pt:PaymentTerms = {
    startDate        : d,
    maturity         : moment(d).add(3, 'month').toDate(),
    merchant_discount: getRandomArbitrary(2, 5),
    credit_discount  : getRandomArbitrary(2, 5),
  }
  return pt
}

const randomBeneficiary = (): Beneficiary => {
  const bene: Beneficiary = {
    id          : getRandomInt(10000000000, 99999999999),
    name        : traders[getRandomInt(0, traders.length)],
    bank_account: getRandomString(3) + getRandomInt(10000000, 99999999).toString(),
    ifsc        : getRandomString(4) + getRandomInt(10000, 99999).toString(),
    split       : 1,
  }

  return bene
}

export const generateTradeLog = (items: number): Trade[] => {

  let trades: Trade[] = Array(items).fill(0).flatMap((_, i) => {
    const terms = randomPaymentTerms()
    const items = Array(getRandomInt(1, 10)).fill(0).map(_ => randomTradeItem())
    const bene = randomBeneficiary()

    // const start = moment(terms.startDate)
    const end = moment(terms.maturity)
    const totalCost = items.map((i) => { return i.price }).reduce((x, y) => x + y)

    const tradeType = Math.random() < 0.6 ? TradeType.SALES: TradeType.PROCUREMENT

    var payments = [] as Payment[]

    const averageDelay = 15
    // pay in fractions as payment date nears
    const earlyPayments = 0.2

    const newPayment = ():Payment => {
      const payment:Payment = {
        id    : getRandomInt(10000000000, 99999999999),
        date  : end.toDate(),
        amount: 0,
        to    : bene,
        credit: false,
        repaid: 0
      }

      return payment
    }

    if (tradeType === TradeType.SALES) {
      if (end.diff(moment(), "days") < -1 * averageDelay) {
        const p1 = newPayment()

        p1.amount = totalCost
        p1.date = end.toDate()

        const p2 = newPayment()
        p2.amount = earlyPayments * totalCost
        p2.credit = true
        p2.repaid = earlyPayments * totalCost * Math.min(end.diff(moment(), "days")/90, 1)
        p2.repaidDate = getRandomDate(moment(end).toDate(), moment(end).add(3, 'month').toDate())

        payments = [p1, p2]
      }
      else if (end.diff(moment(), "days") < 10) {
        const p1 = newPayment()

        p1.amount = totalCost / 2
        p1.date = getRandomDate(moment().subtract(1, 'month').toDate(), moment().toDate())
        payments = [p1]
      } else if (end.diff(moment(), 'days') > 15) {
        const p1 = newPayment()
        // if > 30 days make an early payment
        p1.amount = earlyPayments * totalCost
        p1.credit = true
        // make a repayment as well
        p1.repaid = earlyPayments * totalCost * Math.min(end.diff(moment(), "days")/90, 1)
        p1.repaidDate = getRandomDate(moment().subtract(1, 'month').toDate(), moment().toDate())
        payments = [p1]
      } else {
        payments = []
      }
    } else if (tradeType === TradeType.PROCUREMENT) {
      if (end.diff(moment(), "days") < -1 * averageDelay) {
        const p1 = newPayment()

        p1.amount = totalCost
        p1.date = end.toDate()

        const p2 = newPayment()
        p2.amount = earlyPayments * totalCost
        p2.credit = true
        p2.repaid = earlyPayments * totalCost * Math.min(end.diff(moment(), "days")/90, 1)
        p2.repaidDate = getRandomDate(moment(end).toDate(), moment(end).add(3, 'month').toDate())

        payments = [p1, p2]
      }
      else if (end.diff(moment(), "days") < 10) {
        const p1 = newPayment()

        p1.amount = totalCost / 2
        p1.date = getRandomDate(moment().subtract(1, 'month').toDate(), moment().toDate())
        payments = [p1]
      } else if (end.diff(moment(), 'days') > 15) {
        const p1 = newPayment()
        // if > 30 days make an early payment
        p1.amount = earlyPayments * totalCost
        p1.credit = true
        // make a repayment as well
        p1.repaid = earlyPayments * totalCost * Math.min(end.diff(moment(), "days")/90, 1)
        p1.repaidDate = getRandomDate(moment().subtract(1, 'month').toDate(), moment().toDate())
        payments = [p1]
      } else {
        payments = []
      }
    }

    // manufacturing usecases: procurement -> consumption -> production -> sales
    // trading usecases: procurement -> sales
    let item:Trade = {
      type         : tradeType,
      items        : items,
      terms        : terms,
      beneficiaries: [bene],
      payments     : payments
    }

    if (item.type === TradeType.PROCUREMENT) {
      let conterms = {...terms}
      conterms.startDate = moment(terms.maturity).add(getRandomInt(30, 90), 'day').toDate()
      let consumption: Trade = {
        type         : TradeType.CONSUMPTION,
        items        : items,
        terms        : conterms,
        beneficiaries: [bene],
        payments     : payments
      }
      return [item, consumption]
    } else if (item.type === TradeType.SALES) {
      let prodterms = terms
      prodterms.startDate = moment(terms.maturity).subtract(getRandomInt(30, 90), 'day').toDate()
      let production: Trade = {
        type         : TradeType.PRODUCTION,
        items        : items,
        terms        : prodterms,
        beneficiaries: [bene],
        payments     : payments
      }
      return [item, production]
    }
    return [item]
  })
  return trades
}

