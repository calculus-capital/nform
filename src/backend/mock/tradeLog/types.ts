
export enum TradeType {
  SALES = 1,
  PROCUREMENT
}

export interface TradeItem {
  id            : number
  sku           : string
  description   : string
  quantity      : number
  price         : number
  price_per_unit: number
}

export interface PaymentTerms {
  startDate        : Date
  maturity         : Date
  merchant_discount: number
  credit_discount  : number
}

export interface Beneficiary {
  id          : number
  name        : string
  bank_account: string
  ifsc        : string
  split       : number
}

export interface Trade {
  type : TradeType
  items: TradeItem[]
  terms: PaymentTerms
  beneficiaries: Beneficiary[]
}
