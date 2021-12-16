import React from 'react'

import { ResponsiveBullet } from '@nivo/bullet'
import { BasicTooltip } from '@nivo/tooltip'

const Bullet = (props: { data: any[] }) => {

  return (
      <ResponsiveBullet
          data         = {props.data}
          margin       = {{ top: 20, right: 20, bottom: 50, left: 20 }}
          spacing      = {46}
          layout       = "horizontal"
          titleAlign   = "start"
          titleOffsetX = {-50}
          measureSize  = {0.2}
          rangeColors  = "seq:cool"
          tooltip      = {CustomTooltip}
      />
  )
}

const CustomTooltip = ({ v0, v1, color }: { color: string; v0: number; v1?: number }) => {
  return (
      <BasicTooltip
          id={
              v1 ? (
                  <span style={{ color: 'peachpuff' }}>
                      <strong>₹{v1}L</strong>
                  </span>
              ) : (
                  <strong style={{ color: 'rosybrown' }}>₹{v0}L</strong>
              )
          }
          enableChip={false}
          color={color}
      />
  )
}

export default Bullet
