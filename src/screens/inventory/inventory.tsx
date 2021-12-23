import React, { useState, useMemo } from 'react'
import { Trade } from '../../backend'

import { Form } from 'react-bulma-components'

import styles from './inventory.module.css'
import Table from '../../components/table/table'
import moment from 'moment'
import { TradeType } from '../../backend/mock/tradeLog/types';


interface Props {
  data: Trade[]
}

const inventoryColumns = [{
  Header: "Inventory Log",
  columns: [{
    Header: "Activity",
    accessor: "activity",
  },{
    Header: "SKU",
    accessor: "sku",
  },{
    Header: "Units",
    accessor: "units",
  },{
    Header: "Date",
    accessor: "date",
  },{
    Header: "Partner",
    accessor: "entity",
  },{
    Header: "Cost (₹)",
    accessor: "cost",
  },]
}]

const Inventory = (props: Props) => {

  const inventoryLog = props.data.flatMap(x => {
    return x.items.map(i => {
      return {
        activity  : TradeType[x.type],
        sku   : i.sku,
        units : i.quantity,
        date  : moment(x.terms.startDate).format("DD-MM-YYYY"),
        entity: x.beneficiaries[0].name,
        cost  : Math.round(i.price*100)/100,
      }
    })
  })

  const [data, setData] = useState(inventoryLog)

  return (
    <div className={styles.inventory}>
      <p className={styles.title}>Trade inventory</p>
      <Form.Control className={ styles.search }>
        <Form.Input
          placeholder="Search the inventory: Type something e.g. tata sales 2021"
          type="text"
          onInput={(i) => {
            setData(inventoryLog.filter((x) => {
              const values = Object.values(x).join(' ').toLowerCase()
              // @ts-ignore
              const query: string[] = i.target.value.toLowerCase().split(" ")
              // @ts-ignore
              return query.map(q => values.includes(q)).reduce((x, y) => x & y, true)
            }))
          }}
        />
      </Form.Control>
      {/* @ts-ignore */}
      <Table
        columns={useMemo(() =>  inventoryColumns, [])}
        data={data}
        actions={["📃 Purchase Order", "📃 Invoice", "🚩 Flag"]}
      >
      </Table>
    </div>
  )
}

export default Inventory
