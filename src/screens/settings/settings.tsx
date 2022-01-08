import React, { useMemo, useState } from "react"
import { Cell, Grid } from "styled-css-grid"
import { Trade } from "../../backend"

import DatePicker from "react-date-picker"
import styles from "./settings.module.css"
import { getRandomArbitrary, getRandomInt } from "../../backend/mock/random"
import { Button } from "react-bulma-components"

interface Props {
  data: Trade[]
}

const Slider = (props: { label: string; min: number; max: number; init: number; change?: (x: number) => any }) => {
  const [state, setState] = useState(props.init)

  return (
    <>
      <span className={styles.inputLabel}>
        ⋆ {props.label} {Math.round(state * 100) / 100}
      </span>
      <input
        type="range"
        step={props.max - props.min > 3 ? 1 : (props.max - props.min) / 100}
        value={state}
        min={props.min}
        max={props.max}
        onChange={e => {
          // e.preventDefault()
          setState(parseFloat(e.target.value))
          props.change && props.change(parseFloat(e.target.value))
        }}
        className={styles.slider}
      />
    </>
  )
}

declare global {
  interface Window {
    established       : Date
    ntraders          : number
    tradeStart        : number
    growth            : number
    growthBias        : number
    margin            : number
    averagePrice      : number
    averageQuantity   : number
    minDelay          : number
    maxDelay          : number
    paymentTermsDelay : number[]
    awsCosts          : number
    awsCostsInc       : () => number
    salaryStart       : number
    salaryInc         : () => number
    otherFixedCosts   : number
    otherFixedCostsInc: () => number
    averageDelay      : number
    earlyPayments     : number
    stage             : string
    bankBalance       : number
    nlenders          : number
    averageCreditLine : number
    WACC              : number,
    seed              : number,
    seriesA           : number,
    seriesB           : number,
    dirty             : boolean,
    origLog           : Trade[]
  }
}

const Settings = (props: Props) => {
  const [established, setEstablished] = useState(window.established)

  const [ntraders, setNtraders] = useState(window.ntraders)
  const [tradeStart, setTradeStart] = useState(window.tradeStart)
  const [growth, setGrowth] = useState(window.growth)
  const [growthBias, setGrowthBias] = useState(window.growthBias)
  const [margin, setMargin] = useState(window.margin)
  const [averagePrice, setAveragePrice] = useState(window.averagePrice)
  const [averageQuantity, setAverageQuantity] = useState(window.averageQuantity)
  const [minDelay, setMinDelay] = useState(window.paymentTermsDelay[0])
  const [maxDelay, setMaxDelay] = useState(window.paymentTermsDelay[1])

  // OPEX
  const [awsCosts, setAwsCosts] = useState(window.awsCosts)
  const [awsCostsInc, setAwsCostsInc] = useState(window.awsCostsInc())

  const [salaryStart, setSalaryStart] = useState(window.salaryStart)
  const [salaryInc, setSalaryInc] = useState(window.salaryInc())

  // CAPEX
  const [otherFixedCosts, setOtherFixedCosts] = useState(window.otherFixedCosts)
  const [otherFixedCostsInc, setOtherFixedCostsInc] = useState(window.otherFixedCostsInc())

  const [averageDelay, setAverageDelay] = useState(window.averageDelay)
  const [earlyPayments, setEarlyPayments] = useState(window.earlyPayments)

  // Credit
  // TODO: tie reveunues to credit lines
  const [nlenders, setNLenders] = useState(getRandomInt(1, 5))
  const [averageCreditLine, setAverageCreditLine] = useState(getRandomInt(10, 50))
  const [WACC, setWACC] = useState(getRandomArbitrary(14, 18))

  const [stage, setStage] = useState("seed")
  const bankBalance = useMemo(() => {
    switch (stage) {
      case "seed":
        return window.seed
      case "seriesA":
        return window.seriesA
      case "seriesB":
        return window.seriesB
      default:
        return window.seed
    }
  }, [stage])

  useMemo(() => {
    window.ntraders = ntraders
    window.tradeStart = tradeStart
    window.growth = growth
    window.growthBias = growthBias
    window.margin = margin
    window.averagePrice = averagePrice
    window.averageQuantity = averageQuantity
    window.minDelay = minDelay
    window.maxDelay = maxDelay
    window.paymentTermsDelay = [minDelay, maxDelay]
    window.awsCosts = awsCosts
    window.awsCostsInc = () => getRandomArbitrary(-5, awsCostsInc) / 100
    window.salaryStart = salaryStart
    window.salaryInc = () => getRandomArbitrary(0, salaryInc) / 100
    window.otherFixedCosts = otherFixedCosts
    window.otherFixedCostsInc = () => getRandomArbitrary(0, otherFixedCostsInc) / 100
    window.averageDelay = averageDelay
    window.earlyPayments = earlyPayments
    window.stage = stage
    window.bankBalance = bankBalance
    window.nlenders = nlenders
    window.averageCreditLine = averageCreditLine
    window.WACC = WACC
    window.dirty = (
      window.ntraders !== ntraders ||
      window.tradeStart !== tradeStart ||
      window.growth !== growth ||
      window.growthBias !== growthBias ||
      window.margin !== margin ||
      window.averagePrice !== averagePrice ||
      window.averageQuantity !== averageQuantity ||
      window.minDelay !== minDelay ||
      window.maxDelay !== maxDelay ||
      window.paymentTermsDelay !== [minDelay, maxDelay] ||
      window.awsCosts !== awsCosts ||
      window.salaryStart !== salaryStart ||
      window.otherFixedCosts !== otherFixedCosts ||
      window.averageDelay !== averageDelay ||
      window.earlyPayments !== earlyPayments ||
      window.stage !== stage ||
      window.bankBalance !== bankBalance ||
      window.nlenders !== nlenders ||
      window.averageCreditLine !== averageCreditLine ||
      window.WACC !== WACC
    )
  }, [
    WACC,
    averageCreditLine,
    averageDelay,
    averagePrice,
    averageQuantity,
    awsCosts,
    awsCostsInc,
    bankBalance,
    earlyPayments,
    growth,
    growthBias,
    margin,
    maxDelay,
    minDelay,
    nlenders,
    ntraders,
    otherFixedCosts,
    otherFixedCostsInc,
    salaryInc,
    salaryStart,
    stage,
    tradeStart,
  ])

  return (
    <>
      <span className={styles.inputLabel}>Established: </span>
      <DatePicker onChange={setEstablished} value={established} className={styles.datePicker} />
      <p className={styles.title}>Stage</p>
      <Button.Group>
        <Button
          className={stage === "seed" ? styles.activeStage : styles.stageButton}
          onClick={() => {
            setStage("seed")
          }}
        >
          Seed
        </Button>
        <Button
          className={stage === "seriesA" ? styles.activeStage : styles.stageButton}
          onClick={() => {
            setStage("seriesA")
          }}
        >
          Series A
        </Button>
        <Button
          className={stage === "seriesB" ? styles.activeStage : styles.stageButton}
          onClick={() => {
            setStage("seriesB")
          }}
        >
          Series B
        </Button>
        <Button
          className={stage === "seriesC" ? styles.activeStage : styles.stageButton}
          onClick={() => {
            setStage("seriesC")
          }}
        >
          Series C
        </Button>
        <Button
          className={stage === "seriesD" ? styles.activeStage : styles.stageButton}
          onClick={() => {
            setStage("seriesD")
          }}
        >
          Series D+
        </Button>
      </Button.Group>
      <p className={styles.title}>Trade Configurables</p>
      <Grid columns={2}>
        <Cell center middle>
          <Slider label="Max. number of traders: " min={1} max={100} init={ntraders} change={setNtraders}></Slider>
        </Cell>
        <Cell center middle>
          <Slider label="Traders to start with: " min={1} max={5} init={tradeStart} change={setTradeStart}></Slider>
        </Cell>
        <Cell center middle>
          <Slider label="Order growth multiple: " min={-1} max={1} init={growth} change={setGrowth}></Slider>
        </Cell>
        <Cell center middle>
          <Slider label="Order growth random bias: " min={-1} max={1} init={growthBias} change={setGrowthBias}></Slider>
        </Cell>
        <Cell center middle>
          <Slider label="Margin: " min={0.1} max={0.5} init={margin} change={setMargin}></Slider>
        </Cell>
        <Cell center middle>
          <Slider label="Average price: " min={100} max={10000} init={averagePrice} change={setAveragePrice}></Slider>
        </Cell>
        <Cell center middle>
          <Slider
            label="Average quantity per order: "
            min={1}
            max={10000}
            init={averageQuantity}
            change={setAverageQuantity}
          ></Slider>
        </Cell>
        <Cell center middle>
          <Slider
            label="Min probability of payment delay: "
            min={0}
            max={1}
            init={minDelay}
            change={setMinDelay}
          ></Slider>
        </Cell>
        <Cell center middle>
          <Slider
            label="Max probability of payment delay: "
            min={0}
            max={1}
            init={maxDelay}
            change={setMaxDelay}
          ></Slider>
        </Cell>
      </Grid>
      <p className={styles.title}>Cost Configurables</p>
      <Grid columns={2}>
        <Cell center middle>
          <Slider label="Tech costs: " min={10000} max={100000} init={awsCosts} change={setAwsCosts}></Slider>
        </Cell>
        <Cell center middle>
          <Slider label="Tech costs multiplier: " min={0} max={2} init={window.awsCostsInc()} change={setAwsCostsInc}></Slider>
        </Cell>
        <Cell center middle>
          <Slider
            label="Starting salaries: "
            min={1000000}
            max={10000000}
            init={salaryStart}
            change={setSalaryStart}
          ></Slider>
        </Cell>
        <Cell center middle>
          <Slider label="Salary multiplier" min={0} max={1} init={window.salaryInc()} change={setSalaryInc}></Slider>
        </Cell>
        <Cell center middle>
          <Slider
            label="Other fixed costs: "
            min={100000}
            max={1000000}
            init={otherFixedCosts}
            change={setOtherFixedCosts}
          ></Slider>
        </Cell>
        <Cell center middle>
          <Slider
            label="OFC increment: "
            min={0}
            max={1}
            init={window.otherFixedCostsInc()}
            change={setOtherFixedCostsInc}
          ></Slider>
        </Cell>
        <Cell center middle>
          <Slider label="Settlement: " min={1} max={30} init={averageDelay} change={setAverageDelay}></Slider>
        </Cell>
        <Cell center middle>
          <Slider
            label="Early Payments fraction: "
            min={0}
            max={1}
            init={earlyPayments}
            change={setEarlyPayments}
          ></Slider>
        </Cell>
      </Grid>
      <p className={styles.title}>Credit Configurables</p>
      <Grid columns={2}>
        <Cell center middle>
          <Slider label="Number of lenders: " min={1} max={100} init={nlenders} change={setNLenders}></Slider>
        </Cell>
        <Cell center middle>
          <Slider
            label="Average credit line: "
            min={1}
            max={100}
            init={averageCreditLine}
            change={setAverageCreditLine}
          ></Slider>
        </Cell>
        <Cell center middle>
          <Slider label="Average cost of capital: " min={1} max={100} init={WACC} change={setWACC}></Slider>
        </Cell>
      </Grid>
    </>
  )
}

export default Settings
