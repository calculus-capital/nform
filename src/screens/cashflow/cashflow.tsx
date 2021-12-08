import React from 'react'
import Bullet from '../../components/charts/bullet'

import * as backend from '../../backend'
import { TradeType } from '../../backend/mock/tradeLog/types';

const Cashflow = () => {

  // const data = backend.getTradeLog()
  const data = backend.generateTradeLog(100)
  const receivables = data.filter((d) => { return d.type === TradeType.SALES })
  const payables = data.filter((d) => { return d.type === TradeType.PROCUREMENT })

  console.log(data)

  return (
    <div>
      {/* <Bullet data={ }></Bullet> */}
    </div>
  )
}

export default Cashflow
