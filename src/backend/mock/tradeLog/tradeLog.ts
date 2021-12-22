
import { PaymentTerms, Trade, TradeItem, Beneficiary, TradeType, Payment } from './types';
import { traders } from './constants';
import { getRandomArbitrary, getRandomInt, getRandomString, getRandomDate, getRandomBoolean } from '../random'
import moment from 'moment';

const randomTradeItem = (): TradeItem => {
  const price = getRandomArbitrary(100, 100)
  const quantity: number = getRandomInt(1000, 10000)

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

  let d = getRandomDate(moment().subtract(6, 'month').toDate(), moment().add(1, 'month').toDate())

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

    const start = moment(terms.startDate)
    const end = moment(terms.maturity)
    const totalCost = items.map((i) => { return i.price }).reduce((x, y) => x + y)

    const payment:Payment = {
      id    : getRandomInt(10000000000, 99999999999),
      date  : new Date(),
      amount: 0,
      to    : bene,
      credit: Math.random() < 0.3 ? true : false,
      repaid: 0
    }

    // pay in fractions as payment date nears
    const earlyPayments = 0.5
    if (end.diff(moment(), "days") < 0) {
      payment.amount = totalCost
    }
    else if (end.diff(moment(), "days") < 10) {
      payment.amount = totalCost / 2
    } else if (end.diff(moment(), 'days') > 30) {
      payment.amount = earlyPayments * totalCost
      payment.credit = true
      payment.repaid = earlyPayments * totalCost / 3
      payment.repaidDate = getRandomDate(moment().subtract(1, 'month').toDate(), moment().toDate())
    } else {
      payment.amount = earlyPayments * totalCost
      payment.credit = true
    }

    let item:Trade = {
      type         : Math.random() < 0.6 ? TradeType.SALES: TradeType.PROCUREMENT,
      items        : items,
      terms        : terms,
      beneficiaries: [bene],
      payments     : payment.amount > 0 ? [payment] : []
    }

    if (item.type === TradeType.PROCUREMENT) {
      let conterms = terms
      conterms.startDate = moment(terms.maturity).add(getRandomInt(30, 90), 'day').toDate()
      let consumption: Trade = {
        type         : TradeType.CONSUMPTION,
        items        : items,
        terms        : conterms,
        beneficiaries: [bene],
        payments     : payment.amount > 0 ? [payment] : []
      }
      return [item, consumption]
    } else if (item.type === TradeType.SALES) {
      let prodterms = terms
      prodterms.startDate = moment(terms.maturity).subtract(getRandomInt(30, 90), 'day').toDate()
      let consumption: Trade = {
        type         : TradeType.PRODUCTION,
        items        : items,
        terms        : prodterms,
        beneficiaries: [bene],
        payments     : payment.amount > 0 ? [payment] : []
      }
      return [item, consumption]
    }
    return [item]
  })
  return trades
}
