
import { PaymentTerms, Trade, TradeItem, Beneficiary, TradeType } from './types';
import { traders } from './constants';
import { getRandomArbitrary, getRandomInt, getRandomString, getRandomDate, getRandomBoolean } from '../random'

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
  const date = new Date()

  let pt:PaymentTerms = {
    startDate        : getRandomDate(new Date(date.setMonth(date.getMonth()-6)), date),
    maturity         : getRandomDate(date, new Date(date.setMonth(date.getMonth()+6))),
    merchant_discount: getRandomArbitrary(4, 5),
    credit_discount  : getRandomArbitrary(4, 5),
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

  let trades:Trade[] = Array(items).fill(0).map((_, i) => {
    let item:Trade = {
      type         : getRandomBoolean() ? TradeType.SALES : TradeType.PROCUREMENT,
      items        : Array(getRandomInt(1, 10)).fill(0).map(_ => randomTradeItem()),
      terms        : randomPaymentTerms(),
      beneficiaries: [randomBeneficiary()]
    }
    return item
  })
  return trades
}


