import React from "react";
import ReactEcharts from "echarts-for-react";

const Graph = ({ startDate, endDate, data }) => {
  const generateDatesForMonth = (date1, date2, dataForGraph) => {
    const start = new Date(date1);
    const end = new Date(date2);

    const dates = [];
    let currentDate = start;
    while (currentDate <= end) {
      const formattedDate = formatDate(currentDate);
      const workHours =
        dataForGraph.find((item) => item.date === formattedDate)?.workHours ||
        null;
      dates.push({
        date: formattedDate,
        workHours,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  // const generateDatesForMonth = (data) => {
  //   const dates = data.map((item) => item.date);
  //   return dates;
  // };

  const formatDate = (date) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const graphContent = {
    grid: { top: 20, right: 30, bottom: 50, left: 40 },
    xAxis: {
      type: "category",
      data: generateDatesForMonth(startDate, endDate, data).map(
        (item) => item.date
      ),
      axisLabel: {
        interval: 0, // Labels Display
        rotate: 30,
      },
    },
    yAxis: {
      type: "value",
      // min: 0,
      // max: 14,
    },
    series: [
      {
        data: generateDatesForMonth(startDate, endDate, data).map((item) => ({
          value: item.workHours,
          name: item.date,
          itemStyle: { color: "#CB3837" },
        })),
        type: "bar",
        smooth: true,
        color: ["#CB3837"],
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };
  return (
    <div>
      <ReactEcharts
        option={graphContent}
        style={{ height: "350px" }}
      ></ReactEcharts>
    </div>
  );
};

export default Graph;
