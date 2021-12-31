import { ResponsiveLine } from "@nivo/line"
import moment from "moment"
import { useMediaQuery } from "react-responsive"

import styles from "./charts.module.css"

const Line = (props: { data: any[] }) => {
  const s = useMediaQuery({ query: "(max-width: 481px)" })
  const m = useMediaQuery({ query: "(max-width: 1100px)" })
  // @ts-ignore
  const maxY = Math.max.apply(Math, props.data.flatMap(d => d.data.map(o => o.y)))

  return (
    <ResponsiveLine
      // @ts-ignore
      data={props.data}
      margin={s ? { right: 30, left: 20 } : m ? { bottom: 60 } : { top: 50, right: 0, bottom: 50, left: 20 }}
      xScale={{
        type: "time",
        format: "%d-%m-%Y",
        useUTC: false,
        precision: "day",
      }}
      xFormat="time:%d-%m-%Y"
      yScale={{ type: "linear", min: "auto", max: maxY*1.5, stacked: false, reverse: false }}
      axisTop={null}
      colors={{ scheme: "category10" }}
      enableGridX={false}
      enableGridY={false}
      pointSize={s ? 1 : m ? 2 : 3}
      pointColor={{ theme: "background" }}
      pointBorderWidth={s ? 1 : m ? 2 : 3}
      pointBorderColor={{ from: "serieColor" }}
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
      curve="stepAfter"
      axisLeft={{
        tickValues: 3,
        tickSize: 10,
        tickPadding: 5,
        tickRotation: 270,
        format: "",
        legend: "",
        legendOffset: 0,
      }}
      axisRight={{
        tickValues: 3,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 90,
        format: "",
        legend: "",
        legendOffset: 0,
      }}
      axisBottom={{
        tickValues: s ? 3 : 4,
        tickSize: 15,
        tickPadding: 5,
        tickRotation: s ? 45 : 0,
        format: "%d-%m-%y",
        legend: "Time",
        legendOffset: s ? 10 : 5,
        legendPosition: "middle",
      }}
      markers={[
        {
          axis: "x",
          value: moment().toDate(),
          lineStyle: { stroke: "#ffff00", strokeWidth: 2, strokeOpacity: 0.9 },
          legend: s ? "" : "future",
          legendOrientation: "horizontal",
          legendPosition: s ? "right" : m ? "right" : "top-right",
        },
        {
          axis: "x",
          value: moment().toDate(),
          lineStyle: { stroke: "#ffff00", strokeWidth: 2, strokeOpacity: 0.9 },
          legend: s ? "" : "past",
          legendOrientation: "horizontal",
          legendPosition: s ? "left" : m ? "left" : "top-left",
        },
      ]}
      tooltip={tooltip}
      isInteractive={!s}
      legends={[
        {
          anchor: "top-left",
          direction: "column",
          justify: false,
          translateX: 0,
          translateY: 10,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 200,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 16,
          symbolShape: "square",
          symbolBorderColor: "rgba(255, 255, 255, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(255, 255, 255, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.5)",
          size: 10,
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
            id: "Collected",
          },
          id: "dots",
        },
        {
          match: {
            id: "Credit",
          },
          id: "squares",
        },
        {
          match: {
            id: "Unpaid",
          },
          id: "squares",
        },
        {
          match: {
            id: "To Collect",
          },
          id: "lines",
        },
      ]}
    />
  )
}

const tooltip = (props: any) => {
  return (
    <div className={styles.lineTooltip}>
      <p className={styles.lineTooltipTitle}>Date: {moment(props.point.data.x).format("DD-MM-YYYY")}</p>
      <p className={styles.lineTooltipValue}>
        {props.point.serieId}: ₹{Math.round(props.point.data.y * 100) / 100}L
      </p>
    </div>
  )
}

export default Line
