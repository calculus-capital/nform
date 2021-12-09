import React from 'react'
import Bullet from '../../components/charts/bullet'

import styles from './cashflow.module.css'
import * as backend from '../../backend'
import { TradeType } from '../../backend/mock/tradeLog/types'
import { Cell, Grid } from 'styled-css-grid'
import moment from 'moment'
import { formatForBullet, formatForPie, formatCalendar } from './formatData';
import Pie from '../../components/charts/pie'
import Calendar from '../../components/charts/calendar'

const Cashflow = () => {

  // const data = backend.getTradeLog()
  const data = backend.generateTradeLog(100)

  // Global picture
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

  // Delayed
  const delayedReceivables = receivables.filter((r) => moment(r.terms.maturity).isBefore(moment()))
  const delayedPayables = payables.filter((r) => moment(r.terms.maturity).isBefore(moment()))

  // Receivables
  var delayedReceivablesFormatted = formatForBullet(delayedReceivables)
  let delayedReceivablesRanges = delayedReceivablesFormatted.ranges
  let delayedReceivablesMeasures = delayedReceivablesFormatted.measures

  // Payables
  let delayedPayablesFormatted = formatForBullet(delayedPayables)
  let delayedPayablesRanges = delayedPayablesFormatted.ranges
  let delayedPayablesMeasures = delayedPayablesFormatted.measures

  let pieData = formatForPie(receivables)
  let rxCalendarData = formatCalendar(receivables)
  let txCalendarData = formatCalendar(payables)

  return (
    <div className={styles.cashflow}>
      <div>
        <p className={styles.customer}>Purplle</p>
      </div>
      <p className={styles.title}>Cash Flow (YTD, in Lakhs)</p>
      <div className={ styles.globalcashflow}>
        <Pie data={pieData}></Pie>
      </div>
      {/* Calendars */}
      <Grid columns={2} rows={1} className={styles.calendarContainer}>
        <Cell className={styles.calendarCell}>
          <div className={styles.calendar}>
            <p className={styles.title}>Collections Calendar (YTD, in Lakhs)</p>
            <Calendar data={rxCalendarData}></Calendar>
          </div>
        </Cell>
        <Cell className={styles.calendarCell}>
          <div className={styles.calendar}>
            <p className={styles.title}>Payments Calendar (YTD, in Lakhs)</p>
            <Calendar data={txCalendarData}></Calendar>
          </div>
        </Cell>
      </Grid>
      {/* Global */}
      <Grid columns={2} rows={1} className={ styles.bulletContainer }>
        <Cell width={1} className={styles.bullet}>
          <p className={styles.title}>Receivables (YTD, in Lakhs)</p>
          <Bullet data={[{
            id      : "",
            ranges  : receivablesRanges,
            measures: receivablesMeasures,
            markers : receivablesMeasures
          }]}></Bullet>
        </Cell>
        <Cell width={1} className={styles.bullet}>
          <p className={styles.title}>Payables (YTD, in Lakhs)</p>
          <Bullet data={[{
            id      : "",
            ranges  : payablesRanges,
            measures: payablesMeasures,
            markers : payablesMeasures
          }]}></Bullet>
        </Cell>
      </Grid>
      {/* Delayed */}
      <Grid columns={2} rows={1} className={ styles.bulletContainer }>
        <Cell width={1} className={styles.bullet}>
          <p className={styles.title}>Delayed Receivables (YTD, in Lakhs)</p>
          <Bullet data={[{
            id      : "",
            ranges  : delayedReceivablesRanges,
            measures: delayedReceivablesMeasures,
            markers : delayedReceivablesMeasures
          }]}></Bullet>
        </Cell>
        <Cell width={1} className={styles.bullet}>
          <p className={styles.title}>Delayed Payables (YTD, in Lakhs)</p>
          <Bullet data={[{
            id      : "",
            ranges  : delayedPayablesRanges,
            measures: delayedPayablesMeasures,
            markers : delayedPayablesMeasures
          }]}></Bullet>
        </Cell>
      </Grid>
    </div>
  )
}

export default Cashflow
