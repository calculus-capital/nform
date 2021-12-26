import { ResponsiveTimeRange, TimeRange } from "@nivo/calendar"
import { useMediaQuery } from "react-responsive"

const Calendar = (props: { data: { value: number; day: string }[] }) => {
  const s = useMediaQuery({ query: "(max-width: 1100px)" })

  return (
    <ResponsiveTimeRange
      data={props.data}
      emptyColor="none"
      colors={["#253494", "#1d91c0", "#7fcdbb", "#c7e9b4"]}
      margin={s ? { top: 50 } : { top: 50, right: 20, bottom: 20, left: 20 }}
      dayBorderWidth={0.5}
      dayRadius={0}
      dayBorderColor="#5c5c7c"
      weekdayLegendOffset={s ? 0 : 70}
      weekdayTicks={s ? [] : [1, 5]}
      isInteractive={s}
      // width={500}
      // height={200}
      legends={[
        {
          anchor: s ? "top-left" : "bottom-left",
          direction: "row",
          translateY: s ? -50 : -30,
          translateX: s ? 0 : 0,
          itemCount: 3,
          itemWidth: s ? 50 : 60,
          itemHeight: 36,
          itemsSpacing: 10,
          itemDirection: "right-to-left",
        },
      ]}
    />
  )
}

export default Calendar
