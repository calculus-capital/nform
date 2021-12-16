import React from 'react'
import Bullet from '../../components/charts/bullet'

import styles from './cashflow.module.css'
import { Trade, TradeType } from '../../backend/mock/tradeLog/types'
import { Cell, Grid } from 'styled-css-grid'
import { formatForBullet, formatForPie, formatCalendar } from './formatData';
import Pie from '../../components/charts/pie'
import Calendar from '../../components/charts/calendar'

interface Props {
  data: Trade[]
}

const Cashflow = (props:Props) => {

  const data = props.data

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

  let pieData = formatForPie(data)
  let rxCalendarData = formatCalendar(receivables)
  let txCalendarData = formatCalendar(payables)

  return (
    <div className={styles.cashflow}>
      <div>
        <p className={styles.customer}>Purplle</p>
      </div>
      <p className={styles.title}>Cash Flow (YTD, in Lakhs)</p>
      {/* Calendars */}
      <Grid columns={2} rows={2} className={styles.calendarContainer}>
        <Cell width={1} height={2} className={ styles.globalcashflow}>
          <Pie data={pieData}></Pie>
        </Cell>
        <Cell height={1} width={1} className={styles.calendarCell} center middle>
          <div className={styles.calendar}>
            <p className={styles.title}>Collections Calendar (YTD, in Lakhs)</p>
            <Calendar data={rxCalendarData}></Calendar>
          </div>
        </Cell>
        <Cell height={1} width={1} className={styles.calendarCell}>
          <div className={styles.calendar}>
            <p className={styles.title}>Payments Calendar (YTD, in Lakhs)</p>
            <Calendar data={txCalendarData}></Calendar>
          </div>
        </Cell>
      </Grid>
      {/* Global */}
      <Grid columns={2} rows={1} className={ styles.bulletContainer }>
        <Cell width={1} className={styles.bullet}>
          <p className={styles.title}>To Collect (YTD, in Lakhs)</p>
          <Bullet data={[{
            id      : "",
            ranges  : receivablesRanges,
            measures: receivablesMeasures,
            markers : receivablesMeasures
          }]}></Bullet>
        </Cell>
        <Cell width={1} className={styles.bullet}>
          <p className={styles.title}>To Pay (YTD, in Lakhs)</p>
          <Bullet data={[{
            id      : "",
            ranges  : payablesRanges,
            measures: payablesMeasures,
            markers : payablesMeasures
          }]}></Bullet>
        </Cell>
      </Grid>
    </div>
  )
}

export default Cashflow
