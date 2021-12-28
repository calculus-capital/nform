import moment from "moment"
import { Trade } from "../../backend"
import { groupBy } from "../../utils/groupby"

type CreditEntry = {
  type: string
  customer: string
  credit: number
  remaining: number
  availed: string
  repaid: number
  lastRepaid: string
  maturity: string
}

export const getCredit = (data: Trade[], title: string): CreditEntry[] => {
  return data
    .flatMap(d => {
      return d.payments
        .filter(p => p.credit)
        .map(p => {
          return {
            type: title,
            customer: d.beneficiaries[0].name,
            credit: Math.round(p.amount * 100) / 100,
            remaining: Math.round((p.amount - p.repaid) * 100) / 100,
            availed: moment(p.date).format("DD-MM-YYYY"),
            repaid: Math.round(p.repaid * 100) / 100,
            lastRepaid: moment(p.repaidDate).format("DD-MM-YYYY"),
            maturity: moment(p.date).add("90", "days").format("DD-MM-YYYY"),
          }
        })
    })
    .sort((x, y) => (moment(x.availed).isAfter(moment(y.availed)) ? 1 : -1))
}

export const formatForTreemap = (data: CreditEntry[], color: string) => {
  const byCustomer = groupBy(data, x => x.customer)
  var ctr = 0
  return Object.keys(byCustomer).map(k => {
    ctr = ctr + 90 / data.length
    const ctr2 = ctr + 90
    return {
      name: k,
      color: "#e71590",
      children: [
        {
          name: "Remaining",
          loc: byCustomer[k].map(i => i.remaining).reduce((x, y) => x + y, 0),
          color: "hsl(" + ctr + ", 70%, 60%)",
        },
        {
          name: "Repaid",
          loc: byCustomer[k].map(i => i.repaid).reduce((x, y) => x + y, 0),
          color: "hsl(" + ctr2 + ", 70%, 60%)",
        },
      ],
    }
  })
}
