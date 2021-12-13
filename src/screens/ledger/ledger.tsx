import React, { useMemo } from 'react'
import { Trade } from '../../backend'

import { Form } from 'react-bulma-components'

import styles from './ledger.module.css'
import Table from '../../components/table/table'
import moment from 'moment'
import { TradeType } from '../../backend/mock/tradeLog/types';


interface Props {
  data: Trade[]
}

const Ledger = (props: Props) => {

  const data = props.data

  const ledgerData = data.map(x => {
    return {
      type    : TradeType[x.type],
      date    : moment(x.terms.startDate).format("DD-MM-YYYY"),
      entity  : x.beneficiaries[0].name,
      maturity: moment(x.terms.maturity).format("DD-MM-YYYY"),
      amount  : x.items.reduce((x, y) => x + Math.round(y.price*100)/100, 0),
      cleared : x.payments.reduce((x, y) => x + Math.round(y.amount*100)/100, 0),
      discount: Math.round(x.terms.merchant_discount*100)/100,
    }
  })

  const ledgerColumns = [{
    Header: "Ledger: Showing "+ledgerData.length+" columns",
    columns: [{
      Header: "Txn Type",
      accessor: "type",
    },{
      Header: "Dated",
      accessor: "date",
    },{
      Header: "Customer",
      accessor: "entity",
    },{
      Header: "Maturity",
      accessor: "maturity",
    },{
      Header: "Amount (₹)",
      accessor: "amount",
    },{
      Header: "Cleared (₹)",
      accessor: "cleared",
    },{
      Header: "Discount (%)",
      accessor: "discount",
    },]
  }]
  console.log(ledgerColumns)

  return (
    <div className={styles.ledger}>
      <div>
        <p className={styles.customer}>Purplle</p>
      </div>
      <p className={styles.title}>Trade Ledger</p>
      <Form.Control className={ styles.search }>
        <Form.Input placeholder="Search the ledger: Type something e.g. tata" type="text" />
      </Form.Control>
      {/* @ts-ignore */}
      <Table columns={useMemo(() => ledgerColumns, [])} data={useMemo(() => ledgerData, [])}>
      </Table>
    </div>
  )
}

export default Ledger
