import React from 'react'
import Bullet from '../../components/charts/bullet'

import styles from './cashflow.module.css'
import * as backend from '../../backend'
import { Trade, TradeType } from '../../backend/mock/tradeLog/types'
import { Cell, Grid } from 'styled-css-grid'

const crore = 10000000

const formatForBullet = (data: Trade[]): { ranges:number[], measures:number[] } => {
  const totaldata = data
    .map((r) => {
      return r.items.map(x => x.price).reduce((x,y) => x+y)
    })
    .reduce((x, y) => x + y)

  const dataPaid = data
    .map((r) => {
      return r.payments.length > 0 ?
        r.payments.map((p) => p.amount).reduce((x, y) => x + y) :
        0
    })
    .reduce((x, y) => x + y)

  const dataCredit = data
    .map((r) => {
      return r.payments
        .filter((i) => i.credit)
        .map((p) => p.amount)
        .reduce((x, y) => x + y, 0)
    })
    .reduce((x, y) => x + y)

  const dataRanges = [dataCredit/crore, dataPaid/crore, totaldata/crore]
    .map((i) => Math.round(i))

  const dataMeasures = [totaldata / crore - dataPaid / crore]

  return { ranges: dataRanges, measures: dataMeasures}
}

const Cashflow = () => {

  // const data = backend.getTradeLog()
  const data = backend.generateTradeLog(100)
  const receivables = data.filter((d) => { return d.type === TradeType.SALES })
  const payables = data.filter((d) => { return d.type === TradeType.PROCUREMENT })

  // Receivables
  var receivablesFormatted = formatForBullet(receivables)
  let receivablesRanges = receivablesFormatted.ranges
  let receivablesMeasures = receivablesFormatted.measures

  // Payables
  let payablesFormatted = formatForBullet(payables)
  let payablesRanges = payablesFormatted.ranges
  let payablesMeasures = payablesFormatted.measures

  return (
    <div className={styles.cashflow}>
      <Grid columns={2} rows={1} className={ styles.bulletContainer }>
        <Cell width={1} className={ styles.bullet }>
          <Bullet data={[{
            id      : "Receivables",
            ranges  : receivablesRanges,
            measures: receivablesMeasures,
          }]}></Bullet>
        </Cell>
        <Cell width={1} className={ styles.bullet }>
          <Bullet data={[{
            id      : "Payables",
            ranges  : payablesRanges,
            measures: payablesMeasures,
          }]}></Bullet>
        </Cell>
      </Grid>
    </div>
  )
}

export default Cashflow
