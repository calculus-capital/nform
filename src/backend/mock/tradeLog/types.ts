
export enum TradeType {
  SALES = 1,
  PROCUREMENT,
  CONSUMPTION,
  PRODUCTION,
  AWS,
  FIXED,
  SALARY,
  MARKETING,
  OTHER,
}

export enum Tranche {
  SUPER_SENIOR = "Super Senior",
  SENIOR       = "Senior",
  MEZZANINE    = "Mezzanine",
  EQUITY       = "Equity",
}

export enum RiskWeightings {
  xxl = 100,
  xl  = 80,
  l   = 70,
  m   = 50,
  s   = 30,
  xs  = 20,
  xxs = 10,
}

export enum CapitalWeightings {
  xxl = 100,
  xl  = 80,
  l   = 70,
  m   = 50,
  s   = 30,
  xs  = 20,
  xxs = 10,
}

export enum AccountType {
  CURRENT,
  EQUITY,
  COLLECTIONS,
}

export interface Trader {
  name: string
  risk: RiskWeightings
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
  trader      : Trader
  bank_account: string
  ifsc        : string
  split       : number
}

export interface Payment {
  id         : number
  date       : Date
  amount     : number
  to         : Beneficiary
}

export interface Trade {
  type         : TradeType
  items        : TradeItem[]
  terms        : PaymentTerms
  beneficiaries: Beneficiary[]
  payments     : Payment[]
  credits      : Credit[]
}

export interface Credit {
  line      : CreditLine
  amount    : number
  interest  : number
  availed   : Date
  maturity  : Date
  payment   : Payment
  repayments: Payment[]
}

export interface CreditLine {
  revenueMultiple       : number
  collateral            : number
  overcollateralMultiple: number
  interest              : number
  utilised              : number
  lender                : string
  risk                  : CapitalWeightings
}

export interface Account {
  type   : AccountType
  balance: number
  tag    : string
}
