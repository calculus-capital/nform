// @ts-ignorets-ignore
import moment from "moment"
import React from 'react'

import { ResponsiveTimeRange } from '@nivo/calendar'

const Calendar = (props: { data: { value: number; day: string; }[] }) => {

  return (
    <ResponsiveTimeRange
        data={props.data}
        emptyColor="none"
        colors={['#440A67', '#93329E', '#B4AEE8', '#FFE3FE']}
        margin={{ top: 50, right: 20, bottom: 20, left: 20 }}
        dayBorderWidth={2}
        dayBorderColor="#1c1c30"
        legends={[
            {
                anchor: 'top-left',
                direction: 'row',
                translateY: -50,
                itemCount: 4,
                itemWidth: 40,
                itemHeight: 36,
                itemsSpacing: 10,
                itemDirection: 'right-to-left'
            }
        ]}
    />
  )
}

export default Calendar
