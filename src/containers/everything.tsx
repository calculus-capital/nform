import React, { useState, useEffect } from 'react'
import { Grid, Cell } from 'styled-css-grid'
import { Routes, Route } from "react-router-dom"
import * as backend from '../backend'

import styles from './everything.module.css'
import Sidebar from './sidebar/sidebar'
import Cashflow from '../screens/cashflow/cashflow'
import Ledger from '../screens/ledger/ledger'
import Inventory from '../screens/inventory/inventory'
import Outflows from '../screens/flows/outflow'
import Inflows from '../screens/flows/inflow'
import Credit from '../screens/credit/credit'
import { getRandomInt } from '../backend/mock/random';
import { Button, Modal, Form } from 'react-bulma-components'
import moment from 'moment'

const companies = ["Dunzo", "Epigamia", "Wakefit", "Zivame", "Bombay Shaving Company",
"Wingreen Farms", "Country Delight", "Zouk", "Sleepy Cat", "Kama Ayurveda", "Yogabar",
  "Biryani by Kilo", "mCaffeine", "Flobiz", "Purplle",]

const orig = backend.generateTradeLog(1000)
const company = companies[getRandomInt(0, companies.length-1)]


const Everything = () => {
  const [time, setTime] = useState(30)
  const [timeRange, setTimeRange] = useState(
    orig
      .filter(x => moment(x.terms.maturity).isAfter(moment().subtract(30, 'days')))
  )
  const data = React.useMemo(() => timeRange, [timeRange])

  const filterByTime = (days: number) => {
    setTime(days)
    const t = orig
      .filter(x => moment(x.terms.maturity).isAfter(moment().subtract(days, 'days')))
    setTimeRange(t)
  }

  const [search, setSearch] = useState(false)

  const SearchModal = () => {

    return (
      <Modal show={search} onClose={() => setSearch(false)}>
        <Modal.Content className={styles.searchModalContent}>
          <div className={styles.searchbar}>
            <Form.Control className={styles.search}>
              <Form.Input
                placeholder="Navigate to anywhere: e.g. type receivables"
                type="text"
                autoFocus
                onInput={(i) => {
                  console.log(i)
                }}
              />
            </Form.Control>
          </div>
        </Modal.Content>
      </Modal>
    )
  }

  useEffect(() => {
    document.addEventListener('keydown', event => {
      if (event.key === "k" && event.ctrlKey) {
        setSearch(true)
      }
    })
    return () => {

    }
  }, [])

  return (
    <div className={styles.everything}>
      <div className={styles.something}>
        <Grid columns={10}>
          <Cell width={2} center middle>
            <Sidebar></Sidebar>
          </Cell>
          <Cell width={8} className={styles.content}>
            <Grid columns={11} className={styles.header}>
              <Cell width={5}>
                <p className={styles.customer}>{company}</p>
              </Cell>
              <Cell width={1} middle>
                <Button
                  className={time !== 365 ? styles.timeButton : styles.timeButtonActive}
                  onClick={() => filterByTime(365)}>YTD
                </Button>
              </Cell>
              <Cell width={1} middle>
                <Button
                  className={time !== 180 ? styles.timeButton : styles.timeButtonActive}
                  onClick={() => filterByTime(180)}>180 days
                </Button>
              </Cell>
              <Cell width={1} middle>
                <Button
                  className={time !== 90 ? styles.timeButton : styles.timeButtonActive}
                  onClick={() => filterByTime(90)}>90 days
                </Button>
              </Cell>
              <Cell width={1} middle>
                <Button
                  className={time !== 30 ? styles.timeButton : styles.timeButtonActive}
                  onClick={() => filterByTime(30)}>30 days
                </Button>
              </Cell>
              <Cell width={1} middle>
                <Button
                  className={time !== 7 ? styles.timeButton : styles.timeButtonActive}
                  onClick={() => filterByTime(7)}>7 days
                </Button>
              </Cell>
              <Cell width={1} middle>
                <Button
                  className={time !== -1 ? styles.timeButton : styles.timeButtonActive}
                  onClick={() => filterByTime(-1)}>Future
                </Button>
              </Cell>
            </Grid>
            <Routes>
              <Route path="/" element={<Cashflow data={ data }></Cashflow>}/>
              <Route path="/ledger" element={<Ledger data={data}></Ledger>} />
              <Route path="/inventoryLog" element={<Inventory data={ data }></Inventory> }/>
              <Route path="/ledger" element={<Ledger data={ data }></Ledger> }/>
              <Route path="/payables" element={<Outflows data={ data }></Outflows> }/>
              <Route path="/receivables" element={<Inflows data={ data }></Inflows> }/>
              <Route path="/credit" element={<Credit data={ data }></Credit> }/>
            </Routes>
          </Cell>
        </Grid>
        <SearchModal></SearchModal>
      </div>
    </div>
  )
}

export default Everything
