import moment from "moment"

import { Trade } from "../../backend"

export const flow = (data: Trade[]) => {
  var scr = 0
  return data
    .sort((x, y) => (moment(x.terms.maturity).isAfter(moment(y.terms.maturity)) ? 1 : -1))
    .map(d => {
      const cost = d.items.map(i => i.price).reduce((x, y) => x + y, 0)
      const paid = d.payments
        .filter(x => !x.credit)
        .map(i => i.amount)
        .reduce((x, y) => x + y, 0)

      return {
        x: moment(d.terms.maturity).format("DD-MM-YYYY"),
        y: (cost - paid) / 100000,
      }
    })
    .filter(d => d.y > 0)
    .map(d => {
      scr = scr + d.y
      return {
        x: d.x,
        y: scr,
      }
    })
}

export const volume = (data: Trade[]) => {
  var scr = 0
  return data
    .map(d => {
      const paid = d.payments
        .filter(x => !x.credit)
        .map(i => i.amount)
        .reduce((x, y) => x + y, 0)
      const cr = d.payments
        .filter(x => x.credit)
        .map(i => i.amount-i.repaid)
        .reduce((x, y) => x + y, 0)

      return {
        x: moment(d.terms.maturity),
        y: paid - cr,
      }
    })
    .filter(d => d.y > 0)
    .sort((x, y) => (moment(x.x).isAfter(moment(y.x)) ? 1 : -1))
    .map(d => {
      scr = scr + d.y
      return {
        x: d.x.format("DD-MM-YYYY"),
        y: (d.y + scr) / 100000,
      }
    })
}

export const added = (data: Trade[]) => {
  var scr = 0
  return data
    .map(d => {
      const datum = d.payments
      const cr = datum
        .filter(x => x.credit)
        .map(i => i.amount)
        .reduce((x, y) => x + y, 0)

      const repaid = datum
        .filter(x => x.credit)
        .map(i => i.repaid)
        .reduce((x, y) => x + y, 0)

      const date = datum
        .filter(x => x.credit)
        .map(x => x.date)
        .pop()

      return {
        x: moment(date),
        y: cr - repaid,
      }
    })
    .filter(d => d.y > 0)
    .sort((x, y) => (moment(x.x).isAfter(moment(y.x)) ? 1 : -1))
    .map(d => {
      scr = scr + d.y
      return {
        x: d.x.format("DD-MM-YYYY"),
        y: (d.y + scr) / 100000,
      }
    })
}

export const givenback = (data: Trade[]) => {
  var scr = 0
  return data
    .map(d => {
      const datum = d.payments
      const repaid = datum
        .filter(x => x.credit)
        .map(i => i.repaid)
        .reduce((x, y) => x + y, 0)

      const date = datum
        .filter(x => x.credit)
        .map(x => x.date)
        .pop()

      return {
        x: moment(date),
        y: repaid,
      }
    })
    .filter(d => d.y > 0)
    .sort((x, y) => (moment(x.x).isAfter(moment(y.x)) ? 1 : -1))
    .map(d => {
      scr = scr + d.y
      return {
        x: d.x.format("DD-MM-YYYY"),
        y: (d.y + scr) / 100000,
      }
    })
}

export const upcoming = (data: Trade[]) => {
  return data
    .filter(d => moment(d.terms.maturity).isAfter(moment()))
    .sort((x, y) => (moment(x.terms.maturity).isAfter(moment(y.terms.maturity)) ? 1 : -1))
    .map(d => {
      const topay = d.items.reduce((i, j) => i + Math.round(j.price * 100) / 100, 0)
      const paid = d.payments.reduce((i, j) => i + Math.round(j.amount * 100) / 100, 0)

      return {
        customer: d.beneficiaries[0].name,
        amount: Math.round((topay - paid) * 100) / 100,
        date: moment(d.terms.maturity).format("DD-MM-YYYY"),
      }
    })
}

export const delayed = (data: Trade[]) => {
  return data
    .filter(d => {
      const topay = d.items.reduce((i, j) => i + j.price, 0)
      const paid = d.payments.reduce((i, j) => i + j.amount, 0)

      return moment(d.terms.maturity).isBefore(moment()) && topay !== paid
    })
    .sort((x, y) => (moment(x.terms.maturity).isAfter(moment(y.terms.maturity)) ? 1 : -1))
    .map(d => {
      const topay = d.items.reduce((i, j) => i + j.price, 0)
      const paid = d.payments.reduce((i, j) => i + j.amount, 0)

      return {
        customer: d.beneficiaries[0].name,
        amount: Math.round((topay - paid) * 100) / 100,
        date: moment(d.terms.maturity).format("DD-MM-YYYY"),
      }
    })
}
