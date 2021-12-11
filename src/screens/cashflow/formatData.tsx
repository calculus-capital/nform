import moment from "moment"
import { Trade, TradeType } from "../../backend"

const divisor = 100000

export const formatForBullet = (data: Trade[]): { ranges:number[], measures:number[] } => {
  const totaldata = data
    .map((r) => {
      return r.items.map(x => x.price).reduce((x,y) => x+y)
    })
    .reduce((x, y) => x + y, 0)

  const dataPaid = data
    .map((r) => {
      return r.payments.length > 0 ?
        r.payments.map((p) => p.amount).reduce((x, y) => x + y, 0) :
        0
    })
    .reduce((x, y) => x + y, 0)

  const dataCredit = data
    .map((r) => {
      return r.payments
        .filter((i) => i.credit)
        .map((p) => p.amount)
        .reduce((x, y) => x + y, 0)
    })
    .reduce((x, y) => x + y, 0)

  const dataRanges = [dataCredit/divisor, dataPaid/divisor, totaldata/divisor]
    .map((i) => Math.round(i))

  const dataMeasures = [totaldata/divisor - dataPaid/divisor]

  return { ranges: dataRanges, measures: dataMeasures}
}

export const formatForPie = (data: Trade[]): {id: string, value: number}[] => {
  // receivables
  const receivables = data.filter((d) => { return d.type === TradeType.SALES })
  const totalPaymentsReceived = receivables
    .filter((r) => moment(r.terms.maturity).isAfter(moment()))
    .map((r) => {
      return r.payments.length > 0 ?
        r.payments.filter((p) => !p.credit).map((p) => p.amount).reduce((x, y) => x + y, 0) :
        0
    })
    .reduce((x, y) => x + y, 0)
  const totalCreditReceived = receivables
    .filter((r) => moment(r.terms.maturity).isAfter(moment()))
    .map((r) => {
      return r.payments.length > 0 ?
        r.payments.filter((p) => p.credit).map((p) => p.amount).reduce((x, y) => x + y, 0) :
        0
    })
    .reduce((x, y) => x + y, 0)

  // payables
  const payables = data.filter((d) => { return d.type === TradeType.PROCUREMENT })
  const totalPaymentsSent = payables
    .filter((r) => moment(r.terms.maturity).isAfter(moment()))
    .map((r) => {
      return r.payments.length > 0 ?
        r.payments.filter((p) => !p.credit).map((p) => p.amount).reduce((x, y) => x + y, 0) :
        0
    })
    .reduce((x, y) => x + y, 0)
  const totalCreditSent = payables
    .filter((r) => moment(r.terms.maturity).isAfter(moment()))
    .map((r) => {
      return r.payments.length > 0 ?
        r.payments.filter((p) => p.credit).map((p) => p.amount).reduce((x, y) => x + y, 0) :
        0
    })
    .reduce((x, y) => x + y, 0)

  // delayed receivables
  const delayedReceivables = receivables.filter((r) => moment(r.terms.maturity).isBefore(moment()))
  const totalDelayedPaymentsReceived = delayedReceivables
    .map((r) => {
      return r.payments.length > 0 ?
        r.payments.filter((p) => !p.credit).map((p) => p.amount).reduce((x, y) => x + y, 0) :
        0
    })
    .reduce((x, y) => x + y, 0)
  const totalDelayedCreditReceived = delayedReceivables
    .map((r) => {
      return r.payments.length > 0 ?
        r.payments.filter((p) => p.credit).map((p) => p.amount).reduce((x, y) => x + y, 0) :
        0
    })
    .reduce((x, y) => x + y, 0)

  // delayed payables
  const delayedPayables = payables.filter((r) => moment(r.terms.maturity).isBefore(moment()))
  const totalDelayedPaymentsSent = delayedPayables
    .map((r) => {
      return r.payments.length > 0 ?
        r.payments.filter((p) => !p.credit).map((p) => p.amount).reduce((x, y) => x + y, 0) :
        0
    })
    .reduce((x, y) => x + y, 0)
  const totalDelayedCreditSent = delayedPayables
    .map((r) => {
      return r.payments.length > 0 ?
        r.payments.filter((p) => p.credit).map((p) => p.amount).reduce((x, y) => x + y, 0) :
        0
    })
    .reduce((x, y) => x + y, 0)

  // to be received / paid
  const tobeRX = receivables
    .map((r) => {
      return r.items.map(x => x.price).reduce((x,y) => x+y)
    })
    .reduce((x, y) => x + y, 0) -
    (totalPaymentsReceived + totalCreditReceived + totalDelayedPaymentsReceived + totalDelayedCreditReceived)

  const tobeTX = payables
    .map((r) => {
      return r.items.map(x => x.price).reduce((x,y) => x+y)
    })
    .reduce((x, y) => x + y, 0) -
    (totalPaymentsSent + totalCreditSent + totalDelayedPaymentsSent + totalDelayedCreditSent)

  return [{
    id: "Pending Collections",
    value: Math.round(100 * tobeRX / divisor) / 100,
  }, {
    id: "Collected",
    value: Math.round(100 * totalPaymentsReceived / divisor) / 100,
  },{
    id: "Collected on Credit",
    value: Math.round(100 * totalCreditReceived / divisor) / 100,
    },{
      id: "Collections delayed",
      value: Math.round(100 * totalDelayedPaymentsReceived / divisor) / 100,
    },{
      id: "Collections credit delayed",
      value: Math.round(100 * totalDelayedCreditReceived / divisor) / 100,
    },{
    id: "Pending Payments",
    value: Math.round(100 * tobeTX / divisor) / 100,
  },{
    id: "Paid",
    value: Math.round(100 * totalPaymentsSent / divisor) / 100,
  },{
    id: "Paid on Credit",
    value: Math.round(100 * totalCreditSent / divisor) / 100,
  },{
    id: "Payment delayed",
    value: Math.round(100 * totalDelayedPaymentsSent / divisor) / 100,
  },{
    id: "Payment credit delayed",
    value: Math.round(100 * totalDelayedCreditSent / divisor) / 100,
  }]
}

export const formatCalendar = (data: Trade[]): { value: number, day: string }[] => {
  const cal: Map<string, number> = data.map((d) => {
    let inout = d.type === TradeType.PROCUREMENT ? 1 : -1
    return {
      value: d.items.map((i) => i.price).reduce((x,y) => x+y, 0),
      day: moment(d.terms.maturity).format('YYYY-MM-DD').toString(),
    }
  }).reduce((m: Map<string, number>, i) => {
    m.set(i.day, m.get(i.day) || 0 + i.value)
    return m
  }, new Map<string, number>())

  return Array.from(cal.keys()).map((k:string) => {
      return {
        value: (cal.get(k) || 0) / divisor,
        day: k
      }
    })
}
