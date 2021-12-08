import React from 'react'

import { ResponsiveBullet } from '@nivo/bullet'

const Bullet = (props: { data: any[] }) => {

  return (
      <ResponsiveBullet
          data={props.data}
          margin={{ top: 50, right: 90, bottom: 50, left: 90 }}
          spacing={46}
          layout="horizontal"
          titleAlign="start"
          titleOffsetX={-100}
          measureSize={0.2}
          rangeColors="seq:plasma"
      />
  )
}

export default Bullet
