import { ResponsivePie } from '@nivo/pie'


const Pie = (props: { data: any }) => {

  return (
    <ResponsivePie
      data={props.data}
      // margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius             = {0.7}
      padAngle                = {0.7}
      cornerRadius            = {3}
      activeOuterRadiusOffset = {8}
      colors                  = {{ scheme: 'spectral' }}
      borderWidth             = {1}
      borderColor             = {{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
      arcLinkLabelsSkipAngle  = {10000}
      arcLinkLabelsThickness  = {2}
      arcLinkLabelsColor      = {{ from: 'color' }}
      arcLabelsSkipAngle      = {10}
      enableArcLabels={false}
      arcLabelsTextColor      = {{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
      defs                    = {[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 4,
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
          id: 'squares'
        },
        {
          match: {
            id: 'Pending Payments'
          },
          id: 'squares'
        },
        {
          match: {
            id: 'Paid on Credit'
          },
          id: 'squares'
        },
        {
          match: {
            id: 'Payment delayed'
          },
          id: 'squares'
        },
        {
          match: {
            id: 'Pending Collections'
          },
          id: 'lines'
        },
        {
          match: {
            id: 'Collected'
          },
          id: 'lines'
        },
        {
          match: {
            id: 'Collected on Credit'
          },
          id: 'lines'
        },
        {
          match: {
            id: 'Collections delayed'
          },
          id: 'lines'
        }
      ]}
      legends={[
        {
          anchor: 'center',
          direction: 'column',
          justify: false,
          translateX: -0,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 200,
          itemHeight: 18,
          itemTextColor: '#b2b2b2',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: 'square',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000'
              }
            }
          ]
        }
      ]}
    />
  )
}

export default Pie

