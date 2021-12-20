import { ResponsiveTreeMap } from '@nivo/treemap'

const Treemap = (props: { data: any }) => {

  return (
    <ResponsiveTreeMap
      data={props.data}
      identity="name"
      value="loc"
      valueFormat=".02s"
      colors={({ id, data }) => {
        // console.log(data, "color" in data)
        return data.color
      }}
      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      labelSkipSize={30}
      outerPadding={5}
      nodeOpacity={0.7}
      labelTextColor={{ from: 'color', modifiers: [ [ 'brighter', 1.5 ] ] }}
      parentLabelTextColor={{ from: 'color', modifiers: [ [ 'brighter', 1 ] ] }}
      borderColor={{ from: 'color', modifiers: [['brighter', 5]] }}
      // label={function(e){return e.id+" ("+e.formattedValue+")"}}
      label={function (e) { return "₹" + e.formattedValue;}}
    />
  )
}

export default Treemap
