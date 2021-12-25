import React, { useMemo } from "react"
import { Cell, Grid } from "styled-css-grid"
import { useMediaQuery } from "react-responsive"

import Table from "../../components/table/table"
import { Trade, TradeType } from "../../backend"
import Line from "../../components/charts/line"
import { flow, volume, added, givenback, upcoming, delayed } from './data'

import styles from "./flows.module.css"
import { Card, Heading } from "react-bulma-components"
import "bulma/css/bulma.min.css"

interface Props {
  data: Trade[]
}

const outflowColumns = [
  {
    Header: "To Pay",
    columns: [
      {
        Header: "Customer",
        accessor: "customer",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
    ],
  },
]

const paymentColumns = [
  {
    Header: "Upcoming Payments",
    columns: [
      {
        Header: "Customer",
        accessor: "customer",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Date",
        accessor: "date",
      },
    ],
  },
]

const delayedColumns = [
  {
    Header: "Delayed Payments",
    columns: [
      {
        Header: "Customer",
        accessor: "customer",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Date",
        accessor: "date",
      },
    ],
  },
]

const Outflows = (props: Props) => {
  const s = useMediaQuery({ query: "(max-width: 481px)" })
  const m = useMediaQuery({ query: "(max-width: 1100px)" })

  const data = props.data.filter(d => d.type === TradeType.PROCUREMENT)

  const outflow = flow(data)
  const payments = volume(data)
  const credit = added(data)
  const repaid = givenback(data)

  const outflowPartners = data.reduce((m, d) => {
    const topay = d.items.reduce((i, j) => i + j.price, 0)
    const paid = d.payments.reduce((i, j) => i + j.amount, 0)

    if (d.beneficiaries[0].name in m)
      m.set(
        d.beneficiaries[0].name,
        // @ts-ignore
        m.get(d.beneficiaries[0].name) + topay - paid
      )
    // @ts-ignore
    else m.set(d.beneficiaries[0].name, topay - paid)
    return m
  }, new Map<string, number>())

  var outflowPartnersData: { customer: string; amount: number }[] = []
  for (const [k, v] of outflowPartners) {
    outflowPartnersData.push({
      customer: k,
      amount: Math.round(v*100)/100,
    })
  }
  const payPartners = outflowPartnersData.sort((x, y) => (x.amount < y.amount ? 1 : -1)).filter(p => p.amount > 0)

  const upcomingPayments = upcoming(data)
  const delayedPayments = delayed(data)

  return (
    <div className={styles.container}>
      <Grid columns={s ? 1 : 3} rows={s ? 2 : 1} className={styles.containerGrid}>
        <Cell width={2} height={1}>
          <p className={styles.title}>Cash & Credit Outflow (+90 days Projections)</p>
          <div className={styles.line}>
            {/* @ts-ignore */}
            <Line
              data={[
                {
                  id: "Unpaid",
                  data: outflow,
                },
                {
                  id: "Credit",
                  data: credit,
                },
                {
                  id: "Paid",
                  data: payments,
                },
              ]}
            ></Line>
          </div>
        </Cell>
        <Cell width={s ? 1 : 1} height={1}>
          <Card className={styles.card}>
            <Card.Content>
              <Heading size={4}>Payables</Heading>
              <Heading subtitle size={6} className={styles.metric}>
                {"₹" + Math.round(outflow.reduce((x, y) => x + y.y, 0) * 100) / 100 + "L"}
              </Heading>
            </Card.Content>
          </Card>
          <Card className={styles.card}>
            <Card.Content>
              <Heading size={4}>Paid</Heading>
              <Heading subtitle size={6} className={styles.metric}>
                {"₹" + Math.round(payments.reduce((x, y) => x + y.y, 0) * 100) / 100 + "L"}
              </Heading>
            </Card.Content>
          </Card>
          <Card className={styles.card}>
            <Card.Content>
              <Heading size={4}>Credit Availed</Heading>
              <Heading subtitle size={6} className={styles.metric}>
                {"₹" + Math.round(credit.reduce((x, y) => x + y.y, 0) * 100) / 100 + "L"}
              </Heading>
            </Card.Content>
          </Card>
          <Card className={styles.card}>
            <Card.Content>
              <Heading size={4}>Credit Repaid</Heading>
              <Heading subtitle size={6} className={styles.metric}>
                {"₹" + Math.round(repaid.reduce((x, y) => x + y.y, 0) * 100) / 100 + "L"}
              </Heading>
            </Card.Content>
          </Card>
        </Cell>
      </Grid>
      <Grid columns={m ? 1 : 3} rows={m ? 3 : 1} className={styles.containerGrid}>
        <Cell width={1} height={1}>
          <div className={styles.tables}>
            {/* @ts-ignore */}
            <Table
              columns={useMemo(() => outflowColumns, [])}
              data={payPartners}
              expand={false}
              actions={["📃 Purchase Orders", "📃 Invoices", "☎️ Contact"]}
            ></Table>
          </div>
        </Cell>
        <Cell width={1} height={1} className={styles.tables}>
          {/* @ts-ignore */}
          <Table
            columns={useMemo(() => paymentColumns, [])}
            data={upcomingPayments.slice(0, 10)}
            expand={false}
            actions={["📃 Purchase Order", "📃 Invoice", "💳 Pay", "💸 Discount"]}
          ></Table>
        </Cell>
        <Cell width={1} height={2} className={styles.tables}>
          {/* @ts-ignore */}
          <Table
            columns={useMemo(() => delayedColumns, [])}
            data={delayedPayments}
            expand={false}
            actions={["📃 Purchase Order", "📃 Invoice", "💳 Pay", "🔥 Dispute"]}
          ></Table>
        </Cell>
      </Grid>
    </div>
  )
}

export default Outflows
