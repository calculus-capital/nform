import moment from "moment"
import React, { useMemo } from "react"
import { useMediaQuery } from "react-responsive"

import { Cell, Grid } from "styled-css-grid"
import { Trade, TradeType } from "../../backend"
import Table from "../../components/table/table"

import styles from "./credit.module.css"
import Treemap from "../../components/charts/treemap"
import { Card, Heading } from "react-bulma-components"
import { getCredit, formatForTreemap } from "./data"

interface Props {
  data: Trade[]
}

const creditColumns = [
  {
    Header: "Type",
    accessor: "type",
  },
  {
    Header: "Customer",
    accessor: "customer",
  },
  {
    Header: "Credit",
    accessor: "credit",
  },
  {
    Header: "Availed on",
    accessor: "availed",
  },
  {
    Header: "Repaid",
    accessor: "repaid",
  },
  {
    Header: "Remaining",
    accessor: "remaining",
  },
  {
    Header: "Last Repayment",
    accessor: "repayment",
  },
  {
    Header: "Maturity",
    accessor: "maturity",
  },
]

const Credit = (props: Props) => {
  const s = useMediaQuery({ query: "(max-width: 481px)" })
  // const m = useMediaQuery({ query: "(max-width: 1100px)" })

  const receivables = props.data.filter(d => d.type === TradeType.SALES)
  const payables = props.data.filter(d => d.type === TradeType.PROCUREMENT)

  const receivablesCredit = getCredit(receivables, "Receivables")
  const payablesCredit = getCredit(payables, "Payables")

  const allEvents = receivablesCredit
    .concat(payablesCredit)
    .sort((x, y) => (moment(x.availed).isAfter(moment(y.availed)) ? 1 : -1))

  const rxData = formatForTreemap(receivablesCredit, "#e71590")
  const txData = formatForTreemap(payablesCredit, "#0d945c")

  return (
    <div className={styles.container}>
      <Grid columns={s ? 1 : 3} rows={s ? 3 : 1} className={styles.containerGrid}>
        <Cell width={1} height={1}>
          <Card className={styles.card}>
            <Card.Content>
              <Heading size={4}>Availed</Heading>
              <Heading subtitle size={s ? 3 : 6} className={styles.metric}>
                {"₹" +
                  Math.round(
                    (receivablesCredit.concat(payablesCredit).reduce((x, y) => x + y.credit, 0) * 100) / 100000
                  ) /
                    100 +
                  " L"}
              </Heading>
            </Card.Content>
          </Card>
        </Cell>
        <Cell width={1} height={1}>
          <Card className={styles.card}>
            <Card.Content>
              <Heading size={4}>Active</Heading>
              <Heading subtitle size={s ? 3 : 6} className={styles.metric}>
                {"₹" +
                  Math.round(
                    (receivablesCredit.concat(payablesCredit).reduce((x, y) => x + y.remaining, 0) * 100) / 100000
                  ) /
                    100 +
                  " L"}
              </Heading>
            </Card.Content>
          </Card>
        </Cell>
        <Cell width={1} height={1}>
          <Card className={styles.card}>
            <Card.Content>
              <Heading size={4}>Repaid</Heading>
              <Heading subtitle size={s ? 3 : 6} className={styles.metric}>
                {"₹" +
                  Math.round(
                    (receivablesCredit.concat(payablesCredit).reduce((x, y) => x + y.repaid, 0) * 100) / 100000
                  ) /
                    100 +
                  " L"}
              </Heading>
            </Card.Content>
          </Card>
        </Cell>
      </Grid>
      <Grid columns={3} rows={3} className={styles.containerGrid}>
        <Cell width={3} height={3}>
          <div className={styles.treemap}>
            <Treemap
              data={{
                name: "Total Credit",
                children: [
                  {
                    name: "Credit on Receivables",
                    children: rxData,
                    color: "#550066",
                  },
                  {
                    name: "Credit on Payables",
                    children: txData,
                    color: "#336600",
                  },
                ],
              }}
            ></Treemap>
          </div>
        </Cell>
      </Grid>
      <div className={styles.table}>
        <p className={styles.tableHeader}>Credit Status</p>
        {/* @ts-ignore */}
        <Table
          title="Credit Status"
          columns={useMemo(() => creditColumns, [])}
          data={useMemo(() => allEvents, [allEvents])}
          expand={false}
          actions={["📃 Purchase Order", "📃 Invoice", "💳 Repay"]}
        ></Table>
      </div>
    </div>
  )
}

export default Credit
