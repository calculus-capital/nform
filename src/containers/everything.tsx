import React, { useState, useEffect, useLayoutEffect } from "react"
import { Grid, Cell } from "styled-css-grid"
import { Routes, Route } from "react-router-dom"
import * as backend from "../backend"
import { useMediaQuery } from "react-responsive"
import WebFont from "webfontloader"
import "bulma/css/bulma.min.css"

import styles from "./everything.module.css"
import Sidebar from "./sidebar/sidebar"
import Cashflow from "../screens/cashflow/cashflow"
import Ledger from "../screens/ledger/ledger"
import Inventory from "../screens/inventory/inventory"
import Outflows from "../screens/flows/outflow"
import Inflows from "../screens/flows/inflow"
import Credit from "../screens/credit/credit"
import { getRandomInt } from "../backend/mock/random"
import { Button, Modal, Form } from "react-bulma-components"
import moment from "moment"

import dark from "../themes/dark"
import light from "../themes/light"
import darkBlue from "../themes/darkBlue"
import purple from "../themes/purple"

const companies = [
  "Dunzo",
  "Epigamia",
  "Wakefit",
  "Zivame",
  "Bombay Shaving Company",
  "Wingreen Farms",
  "Country Delight",
  "Zouk",
  "Sleepy Cat",
  "Kama Ayurveda",
  "Yogabar",
  "Biryani by Kilo",
  "mCaffeine",
  "Flobiz",
  "Purplle",
]

const orig = backend.generateTradeLog(1000).concat(backend.generateOtherLog(new Date(2018, 5, 1)))
const company = companies[getRandomInt(0, companies.length - 1)]

WebFont.load({
  google: {
    families: ["Fira Sans:300,400,700", "sans"],
  },
})

function useTheme(theme: number) {
  var t:any = darkBlue
  if (theme === 0) {
    t = darkBlue
  } else if (theme === 1) {
    t = light
  } else if (theme === 2) {
    t = dark
  } else if (theme === 3) {
    t = purple
  }
  console.log(theme)
  for (const key in t) {
    // Update css variables in document's root element
    document.documentElement.style.setProperty(`--${key}`, t[key])
  }
}

const Everything = () => {
  const s = useMediaQuery({ query: "(max-width: 481px)" })
  const m = useMediaQuery({ query: "(max-width: 1100px)" })

  const [theme, setTheme] = useState(0)
  const [time, setTime] = useState(30)
  const [timeRange, setTimeRange] = useState(
    orig.filter(x => moment(x.terms.maturity).isAfter(moment().subtract(30, "days")))
  )
  const data = React.useMemo(() => timeRange, [timeRange])
  useTheme(theme)

  // const Theme = (props: any) => {
  //   if (theme === 1) {
  //     require("../themes/light.module.css")
  //   } else if (theme === 2) {
  //     require("../themes/dark.module.css")
  //   } else if (theme === 0) {
  //     require("../themes/darkBlue.module.css")
  //   } else {
  //     window.location.reload()
  //   }

  //   return <>{props.children}</>
  // }

  const filterByTime = (days: number) => {
    setTime(days)
    const t = orig.filter(x => moment(x.terms.maturity).isAfter(moment().subtract(days, "days")))
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
                onInput={i => {
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
    document.addEventListener("keydown", event => {
      if (event.key === "k" && event.ctrlKey) {
        setSearch(true)
      }
    })
    return () => {}
  }, [])

  return (
    <div className={styles.everything}>
      {/* <Theme> */}
        <div className={styles.something}>
          <Grid columns={10}>
            <Cell width={s ? 2 : 2} center middle>
              <Sidebar></Sidebar>
            </Cell>
            <Cell width={8} className={styles.content}>
              <Grid columns={s ? 4 : 12} rows={s ? 2 : 1} className={styles.header}>
                <Cell width={s ? 4 : 5}>
                  <p className={styles.customer}>{company}</p>
                </Cell>
                {!s && (
                  <Cell width={1} middle>
                    <Button
                      className={time !== 365 ? styles.timeButton : styles.timeButtonActive}
                      onClick={() => filterByTime(365)}
                    >
                      {m ? "360" : "YTD"}
                    </Button>
                  </Cell>
                )}
                {!s && (
                  <Cell width={1} middle>
                    <Button
                      className={time !== 180 ? styles.timeButton : styles.timeButtonActive}
                      onClick={() => filterByTime(180)}
                    >
                      {m ? "180" : "180 days"}
                    </Button>
                  </Cell>
                )}
                <Cell width={1} middle>
                  <Button
                    className={time !== 90 ? styles.timeButton : styles.timeButtonActive}
                    onClick={() => filterByTime(90)}
                  >
                    {m ? "90" : "90 days"}
                  </Button>
                </Cell>
                <Cell width={1} middle>
                  <Button
                    className={time !== 30 ? styles.timeButton : styles.timeButtonActive}
                    onClick={() => filterByTime(30)}
                  >
                    {m ? "30" : "30 days"}
                  </Button>
                </Cell>
                {!s && (
                  <Cell width={1} middle>
                    <Button
                      className={time !== 7 ? styles.timeButton : styles.timeButtonActive}
                      onClick={() => filterByTime(7)}
                    >
                      {m ? "7" : "7 days"}
                    </Button>
                  </Cell>
                )}
                <Cell width={1} middle>
                  <Button
                    className={time !== -1 ? styles.timeButton : styles.timeButtonActive}
                    onClick={() => filterByTime(-1)}
                  >
                    {m ? "🛸" : "Future"}
                  </Button>
                </Cell>
                <Cell width={1} middle>
                  <Button
                    className={time !== -1 ? styles.timeButton : styles.timeButtonActive}
                    onClick={() => setTheme(theme + 1 === 4 ? 0 : theme + 1)}
                  >
                    {m ? theme === 0 ? "⬜" : theme === 1 ? "⬛" : theme === 2 ? "🟪" : "🟦"  : "Theme"}
                  </Button>
                </Cell>
              </Grid>
              <Routes>
                <Route path="/" element={<Cashflow data={data}></Cashflow>} />
                <Route path="/ledger" element={<Ledger data={data}></Ledger>} />
                <Route path="/inventoryLog" element={<Inventory data={data}></Inventory>} />
                <Route path="/ledger" element={<Ledger data={data}></Ledger>} />
                <Route path="/payables" element={<Outflows data={data}></Outflows>} />
                <Route path="/receivables" element={<Inflows data={data}></Inflows>} />
                <Route path="/credit" element={<Credit data={data}></Credit>} />
              </Routes>
            </Cell>
          </Grid>
          <SearchModal></SearchModal>
        </div>
      {/* </Theme> */}
    </div>
  )
}

export default Everything
