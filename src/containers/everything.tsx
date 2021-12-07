import React from 'react'
import { Grid, Cell } from 'styled-css-grid'

import styles from './everything.module.css'
import Sidebar from './sidebar/sidebar'


const Everything = () => {
  return (
    <div className={styles.everything}>
      <div className={styles.something}>
        <Grid columns={10}>
          <Cell width={3}>
            <Sidebar></Sidebar>
          </Cell>
        </Grid>
      </div>
    </div>
  )
}

export default Everything
