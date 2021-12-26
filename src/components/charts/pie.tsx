import { ResponsivePie } from "@nivo/pie"
import { useMediaQuery } from "react-responsive"

const Pie = (props: { data: any }) => {
  const s = useMediaQuery({ query: "(max-width: 481px)" })
  const m = useMediaQuery({ query: "(max-width: 1100px)" })

  return (
    <ResponsivePie
      data={props.data}
      // margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={s ? 0.2 : m ? 0.7 : 0.6}
      padAngle={0.7}
      cornerRadius={0}
      activeOuterRadiusOffset={8}
      colors={{ scheme: "set1" }}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 2]] }}
      arcLinkLabelsSkipAngle={10000}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      enableArcLabels={s}
      isInteractive={!s}
      arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.4)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
        {
          id: "squares",
          type: "patternSquares",
          background: "inherit",
          color: "rgba(0, 0, 0, 0.4)",
          size: 5,
          padding: 2,
          stagger: false,
        },
      ]}
      fill={[
        {
          match: {
            id: "Paid",
          },
          id: "dots",
        },
        {
          match: {
            id: "Salaries",
          },
          id: "lines",
        },
        {
          match: {
            id: "To Pay",
          },
          id: "dots",
        },
        {
          match: {
            id: "Early Paid",
          },
          id: "dots",
        },
        {
          match: {
            id: "Paid (Credit)",
          },
          id: "dots",
        },
        {
          match: {
            id: "To Collect",
          },
          id: "lines",
        },
        {
          match: {
            id: "Collected",
          },
          id: "lines",
        },
        {
          match: {
            id: "Collected (Credit)",
          },
          id: "lines",
        },
        {
          match: {
            id: "Collections delayed",
          },
          id: "lines",
        },
      ]}
      legends={[
        {
          anchor: s ? "bottom" : m ? "center" : "center",
          direction: "column",
          justify: false,
          translateX: s ? 0 : m ? 35 : 30,
          translateY: s ? props.data.length * 22 : m ? 0 : 0,
          itemsSpacing: 2,
          itemWidth: 200,
          itemHeight: 18,
          itemTextColor: "#b2b2b2",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "square",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  )
}

export default Pie
