import moment from 'moment'
import React, { useMemo } from 'react'

import { Cell, Grid } from 'styled-css-grid'
import { Trade, TradeType } from '../../backend'
import Table from '../../components/table/table'

import styles from './credit.module.css'
import { groupBy } from '../../utils/groupby';
import Treemap from '../../components/charts/treemap'
import { Card, Heading } from 'react-bulma-components'

interface Props {
  data: Trade[]
}

const creditColumns = [{
  Header: "Credit Status",
  columns: [{
    Header: "Type",
    accessor: "type",
  },{
    Header: "Customer",
    accessor: "customer",
  },{
    Header: "Credit",
    accessor: "credit",
  },{
    Header: "Availed on",
    accessor: "availed",
  },{
    Header: "Repaid",
    accessor: "repaid",
  },{
    Header: "Remaining",
    accessor: "remaining",
  },{
    Header: "Last Repayment",
    accessor: "repayment",
  },{
    Header: "Maturity",
    accessor: "maturity",
  },]
}]


const Credit = (props: Props) => {

  const receivables =   props.data
    .filter(d => d.type === TradeType.SALES)

  const payables = props.data
    .filter(d => d.type === TradeType.PROCUREMENT)

  const receivablesCredit = receivables
    .flatMap(d => {
      return d
        .payments
        .filter(p => p.credit)
        .map(p => {
          return {
            type: "Receivables",
            customer: d.beneficiaries[0].name,
            credit: p.amount,
            remaining: p.amount - p.repaid,
            availed: moment(p.date).format("DD-MM-YYYY"),
            repaid: p.repaid,
            lastRepaid: moment(p.repaidDate).format("DD-MM-YYYY"),
            maturity: moment(p.date).add('90', 'days').format('DD-MM-YYYY')
          }
        })
    })
    .sort((x, y) => moment(x.availed).isAfter(moment(y.availed)) ? 1 : -1)

  const payablesCredit = payables
    .flatMap(d => {
      return d
        .payments
        .filter(p => p.credit)
        .map(p => {
          return {
            type: "Payables",
            customer: d.beneficiaries[0].name,
            credit: p.amount,
            remaining: p.amount - p.repaid,
            availed: moment(p.date).format("DD-MM-YYYY"),
            repaid: p.repaid,
            lastRepaid: moment(p.repaidDate).format("DD-MM-YYYY"),
            maturity: moment(p.date).add('90', 'days').format('DD-MM-YYYY')
          }
        })
    })
    .sort((x, y) => moment(x.availed).isAfter(moment(y.availed)) ? 1 : -1)

  const allEvents = receivablesCredit.concat(payablesCredit)
    .sort((x, y) => moment(x.availed).isAfter(moment(y.availed)) ? 1 : -1)

  const byCustomerRx = groupBy(receivablesCredit, (x) => x.customer)
  var ctr = 0
  const rxData = Object.keys(byCustomerRx).map(k => {
    ctr = ctr + (90 / receivablesCredit.length)
    const ctr2 = ctr+90
    return {
      name: k,
      color: "#e71590",
      children: [
        {
          name: "Remaining",
          loc: byCustomerRx[k].map(i => i.remaining).reduce((x, y) => x + y, 0),
          color: "hsl("+ctr+", 70%, 60%)"
        },
        {
          name: "Repaid",
          loc: byCustomerRx[k].map(i => i.repaid).reduce((x, y) => x + y, 0),
          color: "hsl("+ctr2+", 70%, 60%)"
        }
      ]
    }
  })

  const byCustomerTx = groupBy(payablesCredit, (x) => x.customer)
  ctr = 180
  const txData = Object.keys(byCustomerTx).map(k => {
    ctr = ctr + (90/payablesCredit.length)
    const ctr2 = ctr+90
    return {
      name: k,
      color: "#0d945c",
      children: [
        {
          name: "Remaining " + k,
          loc: byCustomerTx[k].map(i => i.remaining).reduce((x, y) => x + y, 0),
          color: "hsl("+ctr+", 70%, 60%)"
        },
        {
          name: "Repaid " + k,
          loc: byCustomerTx[k].map(i => i.repaid).reduce((x, y) => x + y, 0),
          color: "hsl("+ctr2+", 70%, 60%)"
        }
      ]
    }
  })

  console.log(rxData.slice(0, 10))

  return (
    <div className={styles.creditContainer}>
      <Grid columns={3} rows={1} className={styles.containerGrid}>
        <Cell width={1} height={1}>
          <Card className={styles.card}>
            <Card.Header>
              {/* <Card.Header.Title>Total Credit</Card.Header.Title> */}
            </Card.Header>
            <Card.Content>
              <Heading size={4}>Total Credit</Heading>
              <Heading subtitle size={6} className={styles.metric}>
                {"₹"+Math.round(receivablesCredit.concat(payablesCredit).reduce((x, y) => x + y.credit, 0)*100)/100}
              </Heading>
            </Card.Content>
          </Card>
        </Cell>
        <Cell width={1} height={1}>
          <Card className={styles.card}>
            <Card.Header>
              {/* <Card.Header.Title>Total Credit</Card.Header.Title> */}
            </Card.Header>
            <Card.Content>
              <Heading size={4}>Credit Active</Heading>
              <Heading subtitle size={6} className={styles.metric}>
                {"₹"+Math.round(receivablesCredit.concat(payablesCredit).reduce((x, y) => x + y.remaining, 0)*100)/100}
              </Heading>
            </Card.Content>
          </Card>
        </Cell>
        <Cell width={1} height={1}>
          <Card className={styles.card}>
            <Card.Header>
              {/* <Card.Header.Title>Total Credit</Card.Header.Title> */}
            </Card.Header>
            <Card.Content>
              <Heading size={4}>Total Repaid</Heading>
              <Heading subtitle size={6} className={styles.metric}>
                {"₹"+Math.round(receivablesCredit.concat(payablesCredit).reduce((x, y) => x + y.repaid, 0)*100)/100}
              </Heading>
            </Card.Content>
          </Card>
        </Cell>
      </Grid>
      <Grid columns={3} rows={3} className={styles.containerGrid}>
        <Cell width={3} height={3}>
          <div className={styles.creditWheel}>
          <Treemap
              data={{
                name: "Total Credit",
                children: [{
                  name: "Credit on Receivables",
                  children: rxData,
                  color: "#550066"
                },{
                  name: "Credit on Payables",
                  children: txData,
                  color: "#336600"
                }]
              }}
          ></Treemap>
          </div>
        </Cell>
      </Grid>
      <div className={styles.creditEvents}>
              {/* @ts-ignore */}
              <Table
                columns={useMemo(() =>  creditColumns, [])}
                data={allEvents}
                expand={false}
                actions={["📃 Purchase Order", "📃 Invoice", "💳 Repay", "⏰ Remind"]}
              >
              </Table>
            </div>
    </div>
  )
}

export default Credit

