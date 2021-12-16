import moment from 'moment'
import React from 'react'
import { Trade } from '../../backend'
import Line from '../../components/charts/line'

import styles from './flows.module.css'

interface Props {
  data: Trade[]
}

const cumsum = ((sum:number) => (value:number) => sum += value)(0);

const Flows = (props: Props) => {
  const data = props.data

  var scr = 0;
  const inflow = data.map(d => {
    return {
      x: moment(d.terms.maturity).format("DD-MM-YYYY"),
      y: Math.floor(d.items.map(i => i.price).reduce((x,y) => x+y, 0) / 100000 * 100) / 100
    }
  }).map(d => {
    scr = scr + d.y
    return {
      x: d.x,
      y: d.y + scr
    }
  })


  return (
    <div className={styles.flowContainer}>
      {/* @ts-ignore */}
      <Line data={[
        {
          id: 'Cash inflow',
          data: inflow,
        },
      ]}></Line>
    </div>
  )
}

export default Flows
