import React from 'react'
import { Grid, Cell } from 'styled-css-grid'
import { Routes, Route } from "react-router-dom"
import * as backend from '../backend'

import styles from './everything.module.css'
import Sidebar from './sidebar/sidebar'
import Cashflow from '../screens/cashflow/cashflow'
import Ledger from '../screens/ledger/ledger'
import Inventory from '../screens/inventory/inventory'
import Outflows from '../screens/flows/outflow'

const Everything = () => {

  const data = React.useMemo(() => backend.generateTradeLog(100), [])

  return (
    <div className={styles.everything}>
      <div className={styles.something}>
        <Grid columns={10}>
          <Cell width={2}>
            <Sidebar></Sidebar>
          </Cell>
          <Cell width={8}>
            <Routes>
              <Route path="/" element={<Cashflow data={ data }></Cashflow>}/>
              <Route path="/ledger" element={<Ledger data={data}></Ledger>} />
              <Route path="/inventory" element={<Inventory data={ data }></Inventory> }/>
              <Route path="/ledger" element={<Ledger data={ data }></Ledger> }/>
              <Route path="/payables" element={<Outflows data={ data }></Outflows> }/>
            </Routes>
          </Cell>
        </Grid>
      </div>
    </div>
  )
}

export default Everything
