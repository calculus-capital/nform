import React from 'react'

import { ResponsiveBullet } from '@nivo/bullet'

const Bullet = (props: { data: any[] }) => {

  return (
      <ResponsiveBullet
          data={props.data}
          margin={{ top: 20, right: 20, bottom: 50, left: 20 }}
          spacing={46}
          layout="horizontal"
          titleAlign="start"
          titleOffsetX={-50}
          measureSize={0.2}
          rangeColors="purpleRed_green"
      />
  )
}

export default Bullet
