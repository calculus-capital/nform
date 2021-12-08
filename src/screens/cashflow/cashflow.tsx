import React from 'react'
import Bullet from '../../components/charts/bullet'

import * as backend from '../../backend'
import { TradeType } from '../../backend/mock/tradeLog/types';

const Cashflow = () => {

  // const data = backend.getTradeLog()
  const data = backend.generateTradeLog(100)
  const receivables = data.filter((d) => { return d.type === TradeType.SALES })
  const payables = data.filter((d) => { return d.type === TradeType.PROCUREMENT })

  const totalReceivables = receivables
    .map((r) => {
      return r.items.map(x => x.price).reduce((x,y) => x+y)
    })
    .reduce((x, y) => x + y)

  const receivablesPaid = receivables
    .map((r) => {
      return r.payments.length > 0 ?
        r.payments.map((p) => p.amount).reduce((x, y) => x + y) :
        0
    })
    .reduce((x, y) => x + y)

  const receivablesCredit = receivables
    .map((r) => {
      return r.payments
        .filter((i) => i.credit)
        .map((p) => p.amount)
        .reduce((x, y) => x + y, 0)
    })
    .reduce((x, y) => x + y)

  const levels = [1, receivablesCredit, receivablesPaid, totalReceivables]
    .map((i) => Math.round(i))

  const measures = [totalReceivables-receivablesPaid]


  return (
    <div>
      <Bullet data={{
        id: "Receivables",
        levels: levels,
        measures: measures
      }}></Bullet>
    </div>
  )
}

export default Cashflow
