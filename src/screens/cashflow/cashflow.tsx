import React from 'react'
import Bullet from '../../components/charts/bullet'

import * as backend from '../../backend'

const Cashflow = () => {

  // const data = backend.getTradeLog()
  const data = backend.generateTradeLog(100)
  console.log(data)

  return (
    <div>
      {/* <Bullet data={ }></Bullet> */}
    </div>
  )
}

export default Cashflow
