import moment from 'moment'
import React, { useMemo } from 'react'

import { Cell, Grid } from 'styled-css-grid'
import { Trade, TradeType } from '../../backend'
import Table from '../../components/table/table'

import styles from './credit.module.css'
import { groupBy } from '../../utils/groupby';
import Sunburst from '../../components/charts/sunburst'
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
      <div>
        <p className={styles.customer}>Purplle</p>
      </div>
      <Grid columns={3} rows={7} className={styles.containerGrid}>
        <Cell width={1} height={1}>
          <Card className={styles.card}>
            <Card.Header>
              {/* <Card.Header.Title>Total Credit</Card.Header.Title> */}
            </Card.Header>
            <Card.Content>
              <Heading size={4}>Total Credit</Heading>
              <Heading subtitle size={6} className={styles.metric}>
                {"₹"+receivablesCredit.concat(payablesCredit).reduce((x, y) => x + y.credit, 0)}
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
                {"₹"+receivablesCredit.concat(payablesCredit).reduce((x, y) => x + y.remaining, 0)}
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
                {"₹"+receivablesCredit.concat(payablesCredit).reduce((x, y) => x + y.repaid, 0)}
              </Heading>
            </Card.Content>
          </Card>
        </Cell>
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
        <Cell width={3} height={3}>
          <div className={styles.creditEvents}>
              {/* @ts-ignore */}
              <Table
                columns={useMemo(() =>  creditColumns, [])}
                data={allEvents}
                expand={false}
              >
              </Table>
            </div>
        </Cell>
      </Grid>
    </div>
  )
}

export default Credit


const ddd = {
  "name": "nivo",
  "children": [
    {
      "name": "viz",
      "children": [
        {
          "name": "stack",
          "children": [
            {
              "name": "cchart",
              "loc": 3976
            },
            {
              "name": "xAxis",
              "loc": 113120
            },
            {
              "name": "yAxis",
              "loc": 185823
            },
            {
              "name": "layers",
              "loc": 106917
            }
          ]
        },
        {
          "name": "ppie",
          "children": [
            {
              "name": "chart",
              "children": [
                {
                  "name": "pie",
                  "children": [
                    {
                      "name": "outline",
                      "loc": 2324
                    },
                    {
                      "name": "slices",
                      "loc": 92225
                    },
                    {
                      "name": "bbox",
                      "loc": 132032
                    }
                  ]
                },
                {
                  "name": "donut",
                  "loc": 89681
                },
                {
                  "name": "gauge",
                  "loc": 98681
                }
              ]
            },
            {
              "name": "legends",
              "loc": 42570
            }
          ]
        }
      ]
    },
    {
      "name": "colors",
      "children": [
        {
          "name": "rgb",
          "loc": 65686
        },
        {
          "name": "hsl",
          "loc": 132888
        }
      ]
    },
    {
      "name": "utils",
      "children": [
        {
          "name": "randomize",
          "loc": 110158
        },
        {
          "name": "resetClock",
          "loc": 105794
        },
        {
          "name": "noop",
          "loc": 38872
        },
        {
          "name": "tick",
          "loc": 169674
        },
        {
          "name": "forceGC",
          "loc": 85900
        },
        {
          "name": "stackTrace",
          "loc": 142911
        },
        {
          "name": "dbg",
          "loc": 65227
        }
      ]
    },
    {
      "name": "generators",
      "children": [
        {
          "name": "address",
          "loc": 9955
        },
        {
          "name": "city",
          "loc": 116489
        },
        {
          "name": "animal",
          "loc": 85695
        },
        {
          "name": "movie",
          "loc": 102695
        },
        {
          "name": "user",
          "loc": 59367
        }
      ]
    },
    {
      "name": "set",
      "children": [
        {
          "name": "clone",
          "loc": 9440
        },
        {
          "name": "intersect",
          "loc": 80703
        },
        {
          "name": "merge",
          "loc": 89634
        },
        {
          "name": "reverse",
          "loc": 0
        },
        {
          "name": "toArray",
          "loc": 81171
        },
        {
          "name": "toObject",
          "loc": 106191
        },
        {
          "name": "fromCSV",
          "loc": 57895
        },
        {
          "name": "slice",
          "loc": 30720
        },
        {
          "name": "append",
          "loc": 77083
        },
        {
          "name": "prepend",
          "loc": 81443
        },
        {
          "name": "shuffle",
          "loc": 36327
        },
        {
          "name": "pick",
          "loc": 89797
        },
        {
          "name": "plouc",
          "loc": 71271
        }
      ]
    },
    {
      "name": "text",
      "children": [
        {
          "name": "trim",
          "loc": 30112
        },
        {
          "name": "slugify",
          "loc": 75293
        },
        {
          "name": "snakeCase",
          "loc": 81321
        },
        {
          "name": "camelCase",
          "loc": 109081
        },
        {
          "name": "repeat",
          "loc": 23323
        },
        {
          "name": "padLeft",
          "loc": 168838
        },
        {
          "name": "padRight",
          "loc": 86329
        },
        {
          "name": "sanitize",
          "loc": 19934
        },
        {
          "name": "ploucify",
          "loc": 186440
        }
      ]
    },
    {
      "name": "misc",
      "children": [
        {
          "name": "greetings",
          "children": [
            {
              "name": "hey",
              "loc": 178259
            },
            {
              "name": "HOWDY",
              "loc": 171573
            },
            {
              "name": "aloha",
              "loc": 186627
            },
            {
              "name": "AHOY",
              "loc": 161231
            }
          ]
        },
        {
          "name": "other",
          "loc": 101204
        },
        {
          "name": "path",
          "children": [
            {
              "name": "pathA",
              "loc": 159728
            },
            {
              "name": "pathB",
              "children": [
                {
                  "name": "pathB1",
                  "loc": 64073
                },
                {
                  "name": "pathB2",
                  "loc": 20259
                },
                {
                  "name": "pathB3",
                  "loc": 79303
                },
                {
                  "name": "pathB4",
                  "loc": 132796
                }
              ]
            },
            {
              "name": "pathC",
              "children": [
                {
                  "name": "pathC1",
                  "loc": 178284
                },
                {
                  "name": "pathC2",
                  "loc": 20178
                },
                {
                  "name": "pathC3",
                  "loc": 14755
                },
                {
                  "name": "pathC4",
                  "loc": 73637
                },
                {
                  "name": "pathC5",
                  "loc": 178617
                },
                {
                  "name": "pathC6",
                  "loc": 102227
                },
                {
                  "name": "pathC7",
                  "loc": 19531
                },
                {
                  "name": "pathC8",
                  "loc": 194519
                },
                {
                  "name": "pathC9",
                  "loc": 70468
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
