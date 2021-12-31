import React, { useMemo } from "react"
import { Cell, Grid } from "styled-css-grid"
import { useMediaQuery } from "react-responsive"

import Table from "../../components/table/table"
import { Trade, TradeType } from "../../backend"
import Line from "../../components/charts/line"
import { flow, volume, added, givenback, upcoming, delayed } from "./data"

import styles from "./flows.module.css"
import { Card, Heading } from "react-bulma-components"
import Calendar from "../../components/charts/calendar"
import { formatCalendar } from "../cashflow/data"
import moment from "moment"

interface Props {
  data: Trade[]
  master: Trade[]
  window: number
}

const inflowColumns = [
  {
    Header: "Collections Remaining",
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

const collectionColumns = [
  {
    Header: "Upcoming collections",
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
    Header: "Delayed collections",
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

const Inflows = (props: Props) => {
  const s = useMediaQuery({ query: "(max-width: 481px)" })
  const m = useMediaQuery({ query: "(max-width: 1100px)" })

  const data = props.data.filter(d => d.type === TradeType.SALES)

  const creditMaster = props.master.filter(d => {
    const creditWithinBounds = d.payments
      .filter(x => x.credit)
      .map(x => moment(x.date).isAfter(moment().subtract(props.window, "days")))
      .reduce((x, y) => (x ? 1 : 0) + (y ? 1 : 0), 0)

    return d.type === TradeType.SALES && creditWithinBounds > 0
  })

  const repaidMaster = props.master.filter(d => {
    const repaidWithinBounds = d.payments
      .filter(x => x.credit)
      .map(x => moment(x.repaidDate ? x.repaidDate : x.date).isAfter(moment().subtract(props.window, "days")))
      .reduce((x, y) => (x ? 1 : 0) + (y ? 1 : 0), 0)

    return d.type === TradeType.SALES && repaidWithinBounds > 0
  })

  const inflow = flow(data)
  const collections = volume(data)
  const credit = added(creditMaster)
  const repaid = givenback(repaidMaster)

  const inflowPartners = data.reduce((m, d) => {
    const topay = d.items.reduce((i, j) => i + j.price, 0)
    const paid = d.payments.reduce((i, j) => i + j.amount / 100, 0)

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

  var inflowPartnersData: { customer: string; amount: number }[] = []
  for (const [k, v] of inflowPartners) {
    inflowPartnersData.push({
      customer: k,
      amount: Math.round(v * 100) / 100,
    })
  }
  const payPartners = inflowPartnersData.sort((x, y) => (x.amount < y.amount ? 1 : -1)).filter(p => p.amount > 0)

  const upcomingPayments = upcoming(data)
  const delayedPayments = delayed(data)
  let rxCalendarData = formatCalendar(data)

  return (
    <div className={styles.container}>
      <Grid columns={s ? 1 : 3} rows={s ? 2 : 1} className={styles.containerGrid}>
        <Cell width={2} height={1}>
          <p className={styles.title}>Cash & Credit Inflow</p>
          <div className={styles.line}>
            {/* @ts-ignore */}
            <Line
              data={[
                {
                  id: "To Collect",
                  data: inflow,
                },
                {
                  id: "Credit",
                  data: credit,
                },
                {
                  id: "Collected",
                  data: collections,
                },
                {
                  id: "Repayment",
                  data: repaid,
                },
              ]}
            ></Line>
          </div>
        </Cell>
        <Cell width={s ? 1 : 1} height={1}>
          <Card className={styles.card}>
            <Card.Content>
              <Heading size={4}>Receivables</Heading>
              <Heading subtitle size={6} className={styles.metric}>
                {"₹" + Math.round(inflow.reduce((x, y) => x + y.y, 0) * 100) / 100 + "L"}
              </Heading>
            </Card.Content>
          </Card>
          <Card className={styles.card}>
            <Card.Content>
              <Heading size={4}>Collected</Heading>
              <Heading subtitle size={6} className={styles.metric}>
                {"₹" + Math.round(collections.reduce((x, y) => x + y.y, 0) * 100) / 100 + "L"}
              </Heading>
            </Card.Content>
          </Card>
          <Card className={styles.card}>
            <Card.Content>
              <Heading size={4}>Credit</Heading>
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
      <p className={styles.title}>Collections Calendar</p>
      <div className={styles.calendar}>
        <Calendar data={rxCalendarData}></Calendar>
      </div>
      <Grid columns={m ? 1 : 3} rows={m ? 3 : 1} className={styles.containerGrid}>
        <Cell width={1} height={1} className={styles.tables}>
          {/* @ts-ignore */}
          <Table
            columns={useMemo(() => inflowColumns, [])}
            data={payPartners}
            expand={false}
            actions={["📃 Purchase Orders", "📃 Invoices", "☎️ Contact"]}
          ></Table>
        </Cell>
        <Cell width={1} height={1} className={styles.tables}>
          {/* @ts-ignore */}
          <Table
            columns={useMemo(() => collectionColumns, [])}
            data={upcomingPayments.slice(0, 10)}
            expand={false}
            actions={["📃 Purchase Order", "📃 Invoice", "💳 Payment Link", "💸 Discount"]}
          ></Table>
        </Cell>
        <Cell width={1} height={2} className={styles.tables}>
          {/* @ts-ignore */}
          <Table
            columns={useMemo(() => delayedColumns, [])}
            data={delayedPayments}
            expand={false}
            actions={["📃 Purchase Order", "📃 Invoice", "💳 Payment Link", "🔥 Report NPA"]}
          ></Table>
        </Cell>
      </Grid>
    </div>
  )
}

export default Inflows
