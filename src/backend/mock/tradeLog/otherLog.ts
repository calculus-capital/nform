import { PaymentTerms, Trade, TradeItem, Beneficiary, TradeType, Payment } from "./types"
import { getRandomArbitrary, getRandomInt, getRandomString } from "../random"
import moment from "moment"

const oneItem = (price: number, name: string): TradeItem => {
  const item: TradeItem = {
    id            : getRandomInt(10000000000, 99999999999),
    sku           : name,
    description   : "",
    quantity      : 1,
    price         : price,
    price_per_unit: price,
  }

  return item
}

const nowpaymentTerms = (d: Date): PaymentTerms => {
  let pt: PaymentTerms = {
    startDate        : d,
    maturity         : moment(d).add(1, "day").toDate(),
    merchant_discount: getRandomArbitrary(2, 5),
    credit_discount  : getRandomArbitrary(2, 5),
  }
  return pt
}

const newBeneficiary = (kind:string): Beneficiary => {
  const bene: Beneficiary = {
    id          : getRandomInt(10000000000, 99999999999),
    name        : kind,
    bank_account: getRandomString(3) + getRandomInt(10000000, 99999999).toString(),
    ifsc        : getRandomString(4) + getRandomInt(10000, 99999).toString(),
    split       : 1,
  }

  return bene
}

export const generateOtherLog = (from: Date): Trade[] => {
  var start = moment(from).startOf("month")
  var end = moment(from).startOf("month").subtract("2", "day")

  var starts: Date[] = []
  var ends: Date[] = []
  while (start.isBefore(moment())) {
    starts = [...starts, start.toDate()]
    ends   = [...ends, end.toDate()]
    start  = start.add("1", "month")
    end    = end.add("1", "month")
  }

  // AWS Charges per month
  var baseCost = window.awsCosts
  const awsCharges = starts.reduce((m: Trade[], e: Date) => {
    const payments = []
    const bene = newBeneficiary("AWS")
    if (moment(e).diff(moment(), "days") < -1 * window.averageDelay) {
      const payment: Payment = {
        id    : getRandomInt(10000000000, 99999999999),
        date  : e,
        amount: baseCost,
        to    : bene,
      }
      payments.push(payment)
    }

    const item: Trade = {
      type         : TradeType.AWS,
      items        : [oneItem(baseCost, "AWS")],
      terms        : nowpaymentTerms(e),
      beneficiaries: [bene],
      payments     : payments,
      credits      : []
    }
    m.push(item)
    baseCost = baseCost + (baseCost * window.awsCostsInc())
    return m
  }, [] as Trade[])

  // Salary per month
  baseCost = window.salaryStart
  const salaryCharges = ends.reduce((m: Trade[], e: Date) => {
    const payments = []
    const bene = newBeneficiary("SALARY")
    if (moment(e).diff(moment(), "days") < -1 * window.averageDelay) {
      const payment: Payment = {
        id    : getRandomInt(10000000000, 99999999999),
        date  : e,
        amount: baseCost,
        to    : bene,
      }
      payments.push(payment)
    }

    const item: Trade = {
      type         : TradeType.SALARY,
      items        : [oneItem(baseCost, "SALARY")],
      terms        : nowpaymentTerms(e),
      beneficiaries: [bene],
      payments     : payments,
      credits      : []
    }
    m.push(item)
    baseCost = baseCost + (baseCost * window.salaryInc())
    return m
  }, [] as Trade[])


  // Other costs per month
  baseCost = window.otherFixedCosts
  const otherCharges = starts.reduce((m: Trade[], e: Date) => {
    const payments = []
    const bene = newBeneficiary("OTHER")
    if (moment(e).diff(moment(), "days") < -1 * window.averageDelay) {
      const payment: Payment = {
        id    : getRandomInt(10000000000, 99999999999),
        date  : e,
        amount: baseCost,
        to    : bene,
      }
      payments.push(payment)
    }

    const item: Trade = {
      type         : TradeType.FIXED,
      items        : [oneItem(baseCost, "FIXED")],
      terms        : nowpaymentTerms(e),
      beneficiaries: [bene],
      payments     : payments,
      credits      : []
    }
    m.push(item)
    baseCost = baseCost + (baseCost * window.otherFixedCostsInc())
    return m
  }, [] as Trade[])

  return awsCharges.concat(salaryCharges).concat(otherCharges)
}
