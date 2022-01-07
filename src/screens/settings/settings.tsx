import React, { useState } from "react"
import { Cell, Grid } from "styled-css-grid"
import { Trade } from "../../backend"

import ReactSlider from "react-slider"
import DatePicker from "react-date-picker"
import styles from "./settings.module.css"
import moment from "moment"
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
        step={props.max - props.min > 10 ? 1 : (props.max - props.min) / 100}
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

const Settings = (props: Props) => {
  const [established, setEstablished] = useState(new Date(2019, 5, 1))

  const [ntraders, setNtraders] = useState(getRandomInt(5, 15))
  const [tradeStart, setTradeStart] = useState(3)
  const [growth, setGrowth] = useState((ntraders - tradeStart) / moment().diff(moment(established), "months"))
  const [growthBias, setGrowthBias] = useState(0.1)
  const [margin, setMargin] = useState(getRandomArbitrary(10, 30) / 100)
  const [averagePrice, setAveragePrice] = useState(1000)
  const [averageQuantity, setAverageQuantity] = useState(50)
  const [minDelay, setMinDelay] = useState(0.4)
  const [maxDelay, setMaxDelay] = useState(0.8)

  // OPEX
  const [awsCosts, setAwsCosts] = useState(getRandomInt(10000, 20000))
  const [awsCostsInc, setAwsCostsInc] = useState(getRandomArbitrary(0, 15) / 100)

  const [salaryStart, setSalaryStart] = useState(getRandomInt(1000000, 2000000))
  const [salaryInc, setSalaryInc] = useState(getRandomArbitrary(0, 10) / 100)

  // CAPEX
  const [otherFixedCosts, setOtherFixedCosts] = useState(100000)
  const [otherFixedCostsInc, setOtherFixedCostsInc] = useState(getRandomArbitrary(0, 10) / 100)

  const [averageDelay, setAverageDelay] = useState(1)
  const [earlyPayments, setEarlyPayments] = useState(0.5)

  const seed = getRandomArbitrary(2000000 * 70, 3000000 * 70)
  // 10-20 nil
  const seriesA = getRandomArbitrary(10000000 * 70, 20000000 * 70)
  // 50 - 100 mil
  const seriesB = getRandomArbitrary(50000000 * 70, 100000000 * 70)

  const [stage, setStage] = useState("seed")
  const bankBalance = stage

  return (
    <>
      <span className={styles.inputLabel}>Established: </span>
      <DatePicker onChange={setEstablished} value={established} className={styles.datePicker} />
      <p className={styles.title}>Stage</p>
      <Button.Group>
        <Button className={stage === "seed" ? styles.activeStage : styles.stageButton} onClick={() => {setStage("seed")}}>Seed</Button>
        <Button className={stage === "seriesA" ? styles.activeStage : styles.stageButton} onClick={() => {setStage("seriesA")}}>Series A</Button>
        <Button className={stage === "seriesB" ? styles.activeStage : styles.stageButton} onClick={() => {setStage("seriesB")}}>Series B</Button>
        <Button className={stage === "seriesC" ? styles.activeStage : styles.stageButton} onClick={() => {setStage("seriesC")}}>Series C</Button>
        <Button className={stage === "seriesD" ? styles.activeStage : styles.stageButton} onClick={() => {setStage("seriesD")}}>Series D</Button>
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
            label="Min probability of payment delay: "
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
          <Slider label="AWS costs: " min={10000} max={100000} init={awsCosts} change={setAwsCosts}></Slider>
        </Cell>
        <Cell center middle>
          <Slider label="AWS costs multiplier: " min={0} max={2} init={awsCostsInc} change={setAwsCostsInc}></Slider>
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
          <Slider label="Salary multiplier" min={0} max={1} init={salaryInc} change={setSalaryInc}></Slider>
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
            init={otherFixedCostsInc}
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
    </>
  )
}

export default Settings
