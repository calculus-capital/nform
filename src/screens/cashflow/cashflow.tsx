import React from "react"
import Bullet from "../../components/charts/bullet"
import { useMediaQuery } from "react-responsive"
import * as backend from "../../backend"

import styles from "./cashflow.module.css"
import { Trade, TradeType } from "../../backend/mock/tradeLog/types"
import { Cell, Grid } from "styled-css-grid"
import { formatForBullet, formatForPie, formatForOpexPie, operatingMetrics } from "./data"
import Pie from "../../components/charts/pie"
import { Card, Heading } from "react-bulma-components"
import { getCredit } from "../credit/data"
import moment from "moment"

interface Props {
  data: Trade[]
  master: Trade[]
}

const Cashflow = (props: Props) => {
  const s = useMediaQuery({ query: "(max-width: 481px)" })
  // const m = useMediaQuery({ query: "(max-width: 1100px)" })

  const data = props.data.filter(x => x.type === TradeType.PROCUREMENT || x.type === TradeType.SALES)

  // Global picture
  const receivables = data.filter(d => {
    return d.type === TradeType.SALES
  })
  const payables = data.filter(d => {
    return d.type === TradeType.PROCUREMENT
  })

  const selectedData = props.data.filter(
    d =>
      d.type === TradeType.SALES ||
      d.type === TradeType.PROCUREMENT ||
      d.type === TradeType.SALARY ||
      d.type === TradeType.AWS ||
      d.type === TradeType.FIXED
  ).filter(x => moment(x.terms.maturity).isBefore(moment()))

  const masterData = props.master.filter(
    d =>
      d.type === TradeType.SALES ||
      d.type === TradeType.PROCUREMENT ||
      d.type === TradeType.SALARY ||
      d.type === TradeType.AWS ||
      d.type === TradeType.FIXED
  ).filter(x => moment(x.terms.maturity).isBefore(moment()))

  // Receivables
  var receivablesFormatted = formatForBullet(receivables)
  let receivablesRanges = receivablesFormatted.ranges
  let receivablesMeasures = receivablesFormatted.measures

  // Payables
  let payablesFormatted = formatForBullet(payables)
  let payablesRanges = payablesFormatted.ranges
  let payablesMeasures = payablesFormatted.measures

  let pieData = formatForPie(data)
  let opexPieData = formatForOpexPie(selectedData)

  let [revenue, expenses, aws, salary, capex] = operatingMetrics(selectedData)
  let [allRevenue, allExpenses, allAws, allSalary, allCapex] = operatingMetrics(masterData)
  let junk = expenses + allAws + allSalary + allCapex
  console.log(junk)
  let currentBalance = backend.bankBalance + allRevenue - allExpenses

  return (
    <div className={styles.cashflow}>
      {/* cards */}
      <Grid columns={s ? 1 : 3} rows={s ? 3 : 1} className={styles.containerGrid}>
        <Cell width={1} height={1}>
          <Card className={styles.card}>
            <Card.Header>{/* <Card.Header.Title>Total Credit</Card.Header.Title> */}</Card.Header>
            <Card.Content>
              <Heading size={4}>Revenue</Heading>
              <Heading subtitle size={s ? 3 : 6} className={styles.metric}>
                {"₹" + Math.round((revenue * 100) / 100000) / 100 + " L"}
              </Heading>
            </Card.Content>
          </Card>
        </Cell>
        <Cell width={1} height={1}>
          <Card className={styles.card}>
            <Card.Header>{/* <Card.Header.Title>Total Credit</Card.Header.Title> */}</Card.Header>
            <Card.Content>
              <Heading size={4}>OPEX</Heading>
              <Heading subtitle size={s ? 3 : 6} className={styles.metric}>
                {"₹" + Math.round(((aws + salary) * 100) / 100000) / 100 + " L"}
              </Heading>
            </Card.Content>
          </Card>
        </Cell>
        <Cell width={1} height={1}>
          <Card className={styles.card}>
            <Card.Header>{/* <Card.Header.Title>Total Credit</Card.Header.Title> */}</Card.Header>
            <Card.Content>
              <Heading size={4}>CAPEX</Heading>
              <Heading subtitle size={s ? 3 : 6} className={styles.metric}>
                {"₹" + Math.round((capex * 100) / 100000) / 100 + " L"}
              </Heading>
            </Card.Content>
          </Card>
        </Cell>
      </Grid>
      <Grid columns={s ? 1 : 3} rows={s ? 3 : 1} className={styles.containerGrid}>
        <Cell width={1} height={1}>
          <Card className={styles.card}>
            <Card.Content>
              <Heading size={4}>EBITDA</Heading>
              <Heading subtitle size={s ? 3 : 6} className={styles.metric}>
                {"₹" + Math.round(((revenue - capex - aws - salary) * 100) / 100000) / 100 + " L"}
              </Heading>
            </Card.Content>
          </Card>
        </Cell>
        <Cell width={1} height={1}>
          <Card className={styles.card}>
            <Card.Content>
              <Heading size={4}>OER</Heading>
              <Heading subtitle size={s ? 3 : 6} className={styles.metric}>
                {Math.round(((capex + aws + salary) * 100) / revenue) / 100}
              </Heading>
            </Card.Content>
          </Card>
        </Cell>
        <Cell width={1} height={1}>
          <Card className={styles.card}>
            <Card.Content>
              <Heading size={4}>Burn Rate</Heading>
              <Heading subtitle size={s ? 3 : 6} className={styles.metric}>
                {Math.round(((currentBalance - capex - aws - salary + revenue) / backend.bankBalance) * 1000) / 1000 +
                  " %"}
              </Heading>
            </Card.Content>
          </Card>
        </Cell>
      </Grid>
      <Grid columns={s ? 1 : 3} rows={s ? 3 : 1} className={styles.containerGrid}>
        <Cell width={1} height={1}>
          <Card className={styles.card}>
            <Card.Content>
              <Heading size={4}>Cash</Heading>
              <Heading subtitle size={s ? 3 : 6} className={styles.metric}>
                {"₹" + Math.round((backend.bankBalance * 100) / 100000) / 100 + " L"}
              </Heading>
            </Card.Content>
          </Card>
        </Cell>
        <Cell width={1} height={1}>
          <Card className={styles.card}>
            <Card.Content>
              <Heading size={4}>WACC</Heading>
              <Heading subtitle size={s ? 3 : 6} className={styles.metric}>
                {Math.round(backend.WACC * 100) / 100}
              </Heading>
            </Card.Content>
          </Card>
        </Cell>
        <Cell width={1} height={1}>
          <Card className={styles.card}>
            <Card.Content>
              <Heading size={4}>Credit</Heading>
              <Heading subtitle size={s ? 3 : 6} className={styles.metric}>
                {"₹" +
                  Math.round(
                    (getCredit(masterData, "")
                      .map(x => x.remaining)
                      .reduce((x, y) => x + y, 0) *
                      100) /
                      100000
                  ) /
                    100 +
                  " L"}
              </Heading>
            </Card.Content>
          </Card>
        </Cell>
      </Grid>
      {/* pies */}
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
      {/* bullet */}
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
