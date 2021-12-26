import React from "react"
import Bullet from "../../components/charts/bullet"
import { useMediaQuery } from "react-responsive"

import styles from "./cashflow.module.css"
import { Trade, TradeType } from "../../backend/mock/tradeLog/types"
import { Cell, Grid } from "styled-css-grid"
import { formatForBullet, formatForPie, formatCalendar, formatForOpexPie } from './data';
import Pie from "../../components/charts/pie"
import Calendar from "../../components/charts/calendar"

interface Props {
  data: Trade[]
}

const Cashflow = (props: Props) => {
  const s = useMediaQuery({ query: "(max-width: 481px)" })
  const m = useMediaQuery({ query: "(max-width: 1100px)" })

  const data = props.data.filter(x => x.type === TradeType.PROCUREMENT || x.type === TradeType.SALES)

  // Global picture
  const receivables = data.filter(d => {
    return d.type === TradeType.SALES
  })
  const payables = data.filter(d => {
    return d.type === TradeType.PROCUREMENT
  })

  const opex = props.data.filter(d => {
    return d.type === TradeType.AWS || d.type === TradeType.SALARY
  })

  const capex = props.data.filter(d => {
    return d.type === TradeType.FIXED
  })

  // Receivables
  var receivablesFormatted = formatForBullet(receivables)
  let receivablesRanges = receivablesFormatted.ranges
  let receivablesMeasures = receivablesFormatted.measures

  // Payables
  let payablesFormatted = formatForBullet(payables)
  let payablesRanges = payablesFormatted.ranges
  let payablesMeasures = payablesFormatted.measures

  let pieData = formatForPie(data)
  let opexPieData = formatForOpexPie(props.data)
  let rxCalendarData = formatCalendar(receivables)
  let txCalendarData = formatCalendar(payables)

  return (
    <div className={styles.cashflow}>
      {/* Calendars */}
      <Grid columns={s ? 1 : 2} className={styles.container}>
        <Cell width={1} className={styles.pie} center>
          <p className={styles.title}>Trade</p>
          <div className={styles.pieChart}>
            <Pie data={pieData}></Pie>
          </div>
        </Cell>
        <Cell width={1} className={styles.pie} center>
          <p className={styles.title}>Expenses</p>
          <div className={styles.pieChart}>
            <Pie data={opexPieData}></Pie>
          </div>
        </Cell>
      </Grid>
      <Grid columns={s ? 1 : 2} className={styles.container}>
        <Cell className={styles.calendarCell} center middle>
          <p className={styles.title}>Collections Calendar</p>
          <div className={styles.calendar}>
            <Calendar data={rxCalendarData}></Calendar>
          </div>
        </Cell>
        <Cell className={styles.calendarCell}>
          <p className={styles.title}>Payments Calendar</p>
          <div className={styles.calendar}>
            <Calendar data={txCalendarData}></Calendar>
          </div>
        </Cell>
      </Grid>
      {/* Global */}
      <Grid columns={s ? 1 : 2} rows={s ? 2 : 1} className={styles.bulletContainer}>
        <Cell width={1} className={styles.bullet}>
          <p className={styles.title}>Inflow: ➡️ On Credit ➡️ Collected ➡️ Not collected</p>
          <Bullet
            data={[
              {
                id: "",
                ranges: receivablesRanges,
                measures: receivablesMeasures,
                markers: receivablesMeasures,
              },
            ]}
          ></Bullet>
        </Cell>
        <Cell width={1} className={styles.bullet}>
          <p className={styles.title}>Outflow: ➡️ On Credit ➡️ Paid ➡️ Unpaid</p>
          <Bullet
            data={[
              {
                id: "",
                ranges: payablesRanges,
                measures: payablesMeasures,
                markers: payablesMeasures,
              },
            ]}
          ></Bullet>
        </Cell>
      </Grid>
    </div>
  )
}

export default Cashflow
