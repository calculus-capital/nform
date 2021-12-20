import { ResponsiveSunburst } from '@nivo/sunburst'

const Sunburst = (props: { data: any }) => {

  return (
    <ResponsiveSunburst
        data={props.data}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        id="name"
        value="loc"
        cornerRadius={0}
        borderColor={{ theme: 'background' }}
      // colors={{ scheme: 'purpleRed_green' }}
        colors={({ id, data }) => {
          // console.log(data, "color" in data)
          return data.color
        }}
        inheritColorFromParent={false}
        childColor={{ from: 'color', modifiers: [ [ 'brighter', 0.4 ] ] }}
        enableArcLabels={true}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 1.4]] }}
    />
  )
}

export default Sunburst
