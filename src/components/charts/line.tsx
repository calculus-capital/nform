import { ResponsiveLine } from '@nivo/line'
import moment from 'moment'

import styles from './charts.module.css'

const Line = (props: { data: any[] }) => {

  return (
    <ResponsiveLine
        // @ts-ignore
        data={props.data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{
            type: 'time',
            format: '%d-%m-%Y',
            useUTC: false,
            precision: 'day',
        }}
        xFormat="time:%d-%m-%Y"
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
        axisTop={null}
        colors={{ scheme: 'category10' }}
        enableGridX={false}
        enableGridY={false}
        pointSize={5}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={5}
        pointBorderColor={{ from: 'serieColor' }}
        enableCrosshair={true}
        crosshairType="cross"
        enablePointLabel={false}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        debugMesh={false}
        enableArea={true}
        areaOpacity={0.1}
        areaBlendMode="difference"
        curve="monotoneX"
        axisLeft={{
          tickValues: 5,
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          format: "",
          legend: "",
          legendOffset: 0
        }}
        axisRight={{
          tickValues: 5,
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          format: "",
          legend: "",
          legendOffset: 0
        }}
        axisBottom={{
          tickValues: 4,
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          format: "%d-%m-%y",
          legend: "Time",
          legendOffset: 36,
          legendPosition: "middle"
        }}
        tooltip={tooltip}
        legends={[
            {
                anchor: 'bottom-left',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 70,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 150,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'square',
                symbolBorderColor: 'rgba(255, 255, 255, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(255, 255, 255, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        defs                    = {[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.5)',
            size: 10,
            padding: 1,
            stagger: true
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.4)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10
          },
          {
            id: "squares",
            type: "patternSquares",
            background: 'inherit',
            color: 'rgba(0, 0, 0, 0.4)',
            size: 5,
            padding: 2,
            stagger: false,
        }
        ]}
        fill={[
          {
            match: {
              id: 'Paid'
            },
            id: 'dots'
          },
          {
            match: {
              id: 'Collected'
            },
            id: 'dots'
          },
          {
            match: {
              id: 'Credit'
            },
            id: 'lines'
          },
          {
            match: {
              id: 'Unpaid'
            },
            id: 'squares'
          },
          {
            match: {
              id: 'To Collect'
            },
            id: 'squares'
          },
        ]}
    />
  )
}

const tooltip = (props:any) => {

  return (
    <div className={styles.lineTooltip}>
      <p className={styles.lineTooltipTitle}>Date: {moment(props.point.data.x).format("DD-MM-YYYY")}</p>
      <p className={styles.lineTooltipValue}>{props.point.serieId}: ₹{Math.round(props.point.data.y*100)/100}L</p>
    </div>
  )
}

export default Line

