import { ResponsiveLine } from '@nivo/line'

const Line = (props: { data: any[] }) => {

  return (
    <ResponsiveLine
        // @ts-ignore
        data={props.data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        // xScale={{ type: 'point' }}
        xFormat="time:%d-%m-%Y"
        // yScale={{ format: "%d-%m-%Y", type: "time" }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        yFormat=" >-.2f"
        // yFormat="time:%d-%m-%Y"
        axisTop={null}
        axisRight={null}
        enableGridX={false}
        pointSize={4}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        enablePointLabel={false}
        pointLabel="y"
        gridXValues={[0, 20, 40, 60, 80, 100, 120]}
        pointLabelYOffset={-12}
        useMesh={true}
        axisBottom={{
          tickValues: "every 15 days",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          // format: "%d-%m-%Y",
          legend: "Time",
          legendOffset: 36,
          legendPosition: "middle"
        }}
        legends={[
            {
                anchor: 'bottom-left',
                direction: 'column',
                justify: false,
                translateX: 0,
                translateY: 50,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
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
    />
  )
}

export default Line

