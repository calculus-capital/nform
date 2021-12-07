import React from 'react'

import { ResponsiveBullet } from '@nivo/bullet'

const Bullet = (props: {data: any}) => {
  return (
    <div>
      <ResponsiveBullet
          data={props.data}
          // margin={{ top: 50, right: 90, bottom: 50, left: 90 }}
          spacing={46}
          titleAlign="start"
          titleOffsetX={-70}
          measureSize={0.2}
          rangeColors="seq:yellow_green_blue"
      />
    </div>
  )
}

export default Bullet
