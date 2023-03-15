import React from "react";
import ReactEcharts from "echarts-for-react";

const graphContent = {
  grid: { top: 20, right: 40, bottom: 20, left: 40 },
  xAxis: {
    type: "category",
    data: ["Present", "Absent", "WFH", "WFO"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [80, 10, 30, 40, 20],
      type: "bar",
      smooth: true,
      color: ["#CB3837"],
    },
  ],
  tooltip: {
    trigger: "axis",
  },
};

const DashboardGraph = () => {
  return (
    <div>
      <ReactEcharts
        option={graphContent}
        style={{ width: "750px", height: "350px" }}
      ></ReactEcharts>
    </div>
  );
};

export default DashboardGraph;
