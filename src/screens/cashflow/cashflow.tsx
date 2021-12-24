import React from 'react'
import Bullet from '../../components/charts/bullet'
import { useMediaQuery } from 'react-responsive'

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

  const s = useMediaQuery({ query: '(max-width: 481px)' })

  const data = props.data
    .filter(x => x.type === TradeType.PROCUREMENT || x.type === TradeType.SALES)

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
      {/* Calendars */}
      <Grid columns={s ? 1 : 2} rows={s ? 5 : 2} className={styles.container}>
        <Cell width={1} height={s ? 3 : 2} className={styles.globalcashflow} center>
          <p className={styles.title}>Cash Flow</p>
          <div className={styles.pie}>
            <Pie data={pieData}></Pie>
          </div>
        </Cell>
        <Cell height={s ? 1 : 1} width={1} className={styles.calendarCell} center middle>
          <div className={styles.calendar}>
            <p className={styles.title}>Collections Calendar</p>
            <Calendar data={rxCalendarData}></Calendar>
          </div>
        </Cell>
        <Cell height={s ? 1 : 1} width={1} className={styles.calendarCell}>
          <div className={styles.calendar}>
            <p className={styles.title}>Payments Calendar</p>
            <Calendar data={txCalendarData}></Calendar>
          </div>
        </Cell>
      </Grid>
      {/* Global */}
      <Grid columns={s ? 1 : 2} rows={s ? 2 : 1} className={ styles.bulletContainer }>
        <Cell width={1} className={styles.bullet}>
          <p className={styles.title}>Total Collections: ➡️ On Credit ➡️ Collected ➡️ Not collected</p>
          <Bullet data={[{
            id      : "",
            ranges  : receivablesRanges,
            measures: receivablesMeasures,
            markers : receivablesMeasures
          }]}></Bullet>
        </Cell>
        <Cell width={1} className={styles.bullet}>
          <p className={styles.title}>Total Payments: ➡️ On Credit ➡️ Paid ➡️ Unpaid</p>
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
