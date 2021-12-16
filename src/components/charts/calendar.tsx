// @ts-ignorets-ignore
import React from 'react'

import { ResponsiveTimeRange, TimeRange } from '@nivo/calendar'

const Calendar = (props: { data: { value: number; day: string; }[] }) => {

  return (
    <ResponsiveTimeRange
        data={props.data}
        emptyColor="none"
        colors={['#d62728', '#f47560', '#fee01b', '#ffff99']}
        margin={{ top: 50, right: 20, bottom: 20, left: 20 }}
        dayBorderWidth={0.5}
        dayRadius={0}
        dayBorderColor="#5c5c7c"
        // width={500}
        // height={200}
        legends={[
            {
                anchor: 'bottom-left',
                direction: 'row',
                translateY: -30,
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
