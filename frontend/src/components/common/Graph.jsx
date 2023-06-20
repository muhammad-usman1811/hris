import React from "react";
import ReactEcharts from "echarts-for-react";

const Graph = ({ startDate, endDate, data }) => {
  const generateDatesForMonth = (date1, date2) => {
    const start = new Date(date1);
    const end = new Date(date2);

    const dates = [];
    let currentDate = start;
    while (currentDate <= end) {
      dates.push(formatDate(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const formatDate = (date) => {
    const options = { month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const graphContent = {
    grid: { top: 20, right: 30, bottom: 20, left: 30 },
    xAxis: {
      type: "category",
      data: generateDatesForMonth(startDate, endDate),
      axisLabel: {
        interval: 0, // Labels Display
      },
    },
    yAxis: {
      type: "time",
    },
    series: [
      {
        data: data,
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
