import moment from 'moment'
import React, { useMemo } from 'react'
import { Cell, Grid } from 'styled-css-grid'

import Table from '../../components/table/table'
import { Trade, TradeType } from '../../backend'
import Line from '../../components/charts/line'

import styles from './flows.module.css'
import { Card, Heading } from 'react-bulma-components'
import 'bulma/css/bulma.min.css';

interface Props {
  data: Trade[]
}

const cumsum = ((sum:number) => (value:number) => sum += value)(0)

const outflowColumns = [{
  Header: "To Pay",
  columns: [{
    Header: "Customer",
    accessor: "customer",
  },{
    Header: "Amount",
    accessor: "amount",
  },]
}]

const paymentColumns = [{
  Header: "Upcoming Payments",
  columns: [{
    Header: "Customer",
    accessor: "customer",
  },{
    Header: "Amount",
    accessor: "amount",
  },{
    Header: "Date",
    accessor: "date",
  }]
}]

const delayedColumns = [{
  Header: "Delayed Payments",
  columns: [{
    Header: "Customer",
    accessor: "customer",
  },{
    Header: "Amount",
    accessor: "amount",
  },{
    Header: "Date",
    accessor: "date",
  }]
}]

const Outflows = (props: Props) => {
  const data = props.data
    .filter(d => d.type === TradeType.PROCUREMENT)

  var scr = 0;
  const outflow = data
    .sort((x, y) => moment(x.terms.maturity).isAfter(moment(y.terms.maturity)) ? 1 : -1)
    .map(d => {
      const cashin = Math.floor(d.payments.map(i => i.amount).reduce((x,y) => x+y, 0) / 100000 * 100) / 100
      const cashout = Math.floor(d.items.map(i => i.price).reduce((x,y) => x+y, 0) / 100000 * 100) / 100

      return {
        x: moment(d.terms.maturity).format("DD-MM-YYYY"),
        y: cashout - cashin
      }
    })
    .filter(d => d.y > 0)
    .map(d => {
      scr = scr + d.y
      return {
        x: d.x,
        y: (d.y + scr)
      }
    })

  scr = 0
  const payments = data
    .sort((x, y) => moment(x.terms.maturity).isAfter(moment(y.terms.maturity)) ? 1 : -1)
    .map(d => {
      const cashin = Math.floor(d.payments.map(i => i.amount).reduce((x,y) => x+y, 0) / 100000 * 100) / 100
      const cr = Math.floor(d.payments.filter(x => x.credit).map(i => i.amount).reduce((x,y) => x+y, 0) / 100000 * 100) / 100

      return {
        x: moment(d.terms.maturity).format("DD-MM-YYYY"),
        y: cashin - cr
      }
    })
    .filter(d => d.y > 0)
    .map(d => {
      scr = scr + d.y
      return {
        x: d.x,
        y: d.y + scr
      }
    })

  scr = 0
  const credit = data
    .sort((x, y) => moment(x.terms.maturity).isAfter(moment(y.terms.maturity)) ? 1 : -1)
    .map(d => {
      const cr = Math.floor(d.payments.filter(x => x.credit).map(i => i.amount).reduce((x,y) => x+y, 0) / 100000 * 100) / 100

      return {
        x: moment(d.terms.maturity).format("DD-MM-YYYY"),
        y: cr
      }
    })
    .filter(d => d.y > 0)
    .map(d => {
      scr = scr + d.y
      return {
        x: d.x,
        y: d.y + scr
      }
    })

  const outflowPartners = data
    .reduce((m, d) => {
      const topay = d.items.reduce((i, j) => i + Math.round(j.price*100)/100, 0)
      const paid = d.payments.reduce((i, j) => i + Math.round(j.amount*100)/100, 0)

      if (d.beneficiaries[0].name in m)
        // @ts-ignore
        m.set(d.beneficiaries[0].name, m.get(d.beneficiaries[0].name) + topay - paid)
      else
        // @ts-ignore
        m.set(d.beneficiaries[0].name, topay - paid)
      return m
    }, new Map<string, number>())

  var outflowPartnersData:{customer: string, amount: number}[] = []
  for (const [k, v] of outflowPartners) {
    outflowPartnersData.push({
      customer: k,
      amount: v
    })
  }
  const payPartners = outflowPartnersData
    .sort((x, y) => x.amount < y.amount ? 1 : -1)
    .filter(p => p.amount > 0)

  const upcomingPayments = data
    .filter(d => moment(d.terms.maturity).isAfter(moment()))
    .sort((x, y) => moment(x.terms.maturity).isAfter(moment(y.terms.maturity)) ? 1 : -1)
    .map(d => {
      const topay = d.items.reduce((i, j) => i + Math.round(j.price*100)/100, 0)
      const paid = d.payments.reduce((i, j) => i + Math.round(j.amount*100)/100, 0)

      return {
        customer: d.beneficiaries[0].name,
        amount: topay - paid,
        date: moment(d.terms.maturity).format("DD-MM-YYYY")
      }
    })

    const delayedPayments = data
      .filter(d => {
        const topay = d.items.reduce((i, j) => i + Math.round(j.price*100)/100, 0)
        const paid = d.payments.reduce((i, j) => i + Math.round(j.amount*100)/100, 0)

        return moment(d.terms.maturity).isBefore(moment()) && topay != paid
      })
      .sort((x, y) => moment(x.terms.maturity).isAfter(moment(y.terms.maturity)) ? 1 : -1)
      .map(d => {
        const topay = d.items.reduce((i, j) => i + Math.round(j.price*100)/100, 0)
        const paid = d.payments.reduce((i, j) => i + Math.round(j.amount*100)/100, 0)

        return {
          customer: d.beneficiaries[0].name,
          amount: topay - paid,
          date: moment(d.terms.maturity).format("DD-MM-YYYY")
        }
      })

  return (
    <div className={styles.flowContainer}>
      <Grid columns={3} rows={1} className={styles.containerGrid}>
        <Cell width={2} height={1} >
          <p className={styles.title}>Cash & Credit Outflow</p>
          <div className={styles.outflowLine}>
            {/* @ts-ignore */}
            <Line data={[
              {
                id: 'Unpaid',
                data: outflow,
              },{
                id: "Credit",
                data: credit
              },{
                id: "Paid",
                data: payments
              }
            ]}></Line>
          </div>
        </Cell>
        <Cell width={1} height={1} className={styles.card}>
          <Card>
            <Card.Header>
              {/* <Card.Header.Title>Total Credit</Card.Header.Title> */}
            </Card.Header>
            <Card.Content>
              <Heading size={4}>Total Payables</Heading>
              <Heading subtitle size={6} className={styles.metric}>
                {"₹"+Math.round(outflow.reduce((x, y) => x + y.y, 0)*100)/100+"L"}
              </Heading>
            </Card.Content>
          </Card>
          <Card>
            <Card.Header>
              {/* <Card.Header.Title>Total Credit</Card.Header.Title> */}
            </Card.Header>
            <Card.Content>
              <Heading size={4}>Total Paid</Heading>
              <Heading subtitle size={6} className={styles.metric}>
                {"₹"+Math.round(payments.reduce((x, y) => x + y.y, 0)*100)/100+"L"}
              </Heading>
            </Card.Content>
          </Card>
          <Card>
            <Card.Header>
              {/* <Card.Header.Title>Total Credit</Card.Header.Title> */}
            </Card.Header>
            <Card.Content>
              <Heading size={4}>Total Credit</Heading>
              <Heading subtitle size={6} className={styles.metric}>
                {"₹"+Math.round(credit.reduce((x, y) => x + y.y, 0)*100)/100+"L"}
              </Heading>
            </Card.Content>
          </Card>
        </Cell>
      </Grid>
      <Grid columns={3} rows={1} className={styles.containerGrid}>
        <Cell width={1} height={1}>
          <div className={styles.tables}>
            {/* @ts-ignore */}
            <Table
              columns={useMemo(() =>  outflowColumns, [])}
              data={payPartners}
              expand={false}
              actions={["📃 Purchase Orders", "📃 Invoices", "☎️ Contact"]}
            >
            </Table>
          </div>
        </Cell>
        <Cell width={1} height={1} className={styles.tables}>
            {/* @ts-ignore */}
            <Table
              columns={useMemo(() =>  paymentColumns, [])}
              data={upcomingPayments.slice(0, 10)}
              expand={false}
              actions={["📃 Purchase Order", "📃 Invoice", "💳 Pay", "💸 Discount"]}
            >
            </Table>
        </Cell>
        <Cell width={1} height={1} className={styles.tables}>
            {/* @ts-ignore */}
            <Table
              columns={useMemo(() =>  delayedColumns, [])}
              data={delayedPayments}
              expand={false}
              actions={["📃 Purchase Order", "📃 Invoice", "💳 Pay", "🔥 Dispute"]}
            >
            </Table>
        </Cell>
      </Grid>
    </div>
  )
}

export default Outflows
