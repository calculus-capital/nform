import { ResponsiveTimeRange } from "@nivo/calendar"
import { useMediaQuery } from "react-responsive"

const Calendar = (props: { data: { value: number; day: string }[] }) => {
  const s = useMediaQuery({ query: "(max-width: 481px)" })
  const m = useMediaQuery({ query: "(max-width: 1100px)" })

  return (
    <ResponsiveTimeRange
      data={props.data}
      emptyColor="none"
      colors={["#253494", "#1d91c0", "#7fcdbb", "#c7e9b4"]}
      margin={s ? { top: 50 } : m ? {top: 30} : { top: 0, right: 0, bottom: 20, left: 20 }}
      dayBorderWidth={1}
      dayRadius={0}
      dayBorderColor="#222222"
      weekdayLegendOffset={s ? 0 : m ? 60 : 70}
      weekdayTicks={s ? [] : [1, 5]}
      isInteractive={true}
      square={false}
      // width={500}
      // height={200}
      legends={[
        {
          anchor: s ? "top-left" : m ? "top-left" : "bottom-left",
          direction: "row",
          translateY: s ? -50 : m ? -55 : 20,
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
