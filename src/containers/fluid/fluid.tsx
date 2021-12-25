import React from "react"

import GridLayout from "react-grid-layout"
import styles from "./fluid.module.css"

type Layout = {
  i: string
  x: number
  y: number
  w: number
  h: number
}

const Fluid = (props: { layout: Layout[]; keys: string[]; children: any }) => {
  return (
    <div className={styles.fluid}>
      <GridLayout className="layout" layout={props.layout} cols={props.layout.length} rowHeight={30} width={1200}>
        {props.children}
      </GridLayout>
    </div>
  )
}

export default Fluid
