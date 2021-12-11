import React from 'react'
import { Grid, Cell } from 'styled-css-grid'
import Cashflow from '../screens/cashflow/cashflow'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import styles from './everything.module.css'
import Sidebar from './sidebar/sidebar'


const Everything = () => {
  return (
    <div className={styles.everything}>
      <div className={styles.something}>
        <Grid columns={10}>
          <Cell width={2}>
            <Sidebar></Sidebar>
          </Cell>
          <Cell width={8}>
            <Routes>
              <Route path="/" element={<Cashflow></Cashflow>}/>
              <Route path="/procurement" element={ <Cashflow></Cashflow> }/>
            </Routes>
          </Cell>
        </Grid>
      </div>
    </div>
  )
}

export default Everything
