import React from "react";
import ReactEcharts from "echarts-for-react";

const PieChart = ({ graphData, pieChartRef }) => {
  const graphContent = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      orient: "vertical",
      left: "left",
      textStyle: {
        fontFamily: "Roboto, sans-serif",
      },
    },
    series: [
      {
        name: "Work Hours",
        type: "pie",
        radius: ["40%", "70%"],
        data: graphData,
        label: {
          show: true,
          formatter: "{b}: {c} hours",
          textStyle: {
            fontFamily: "Roboto, sans-serif",
            fontSize: 16,
          },
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return (
    <div ref={pieChartRef}>
      <ReactEcharts option={graphContent}></ReactEcharts>
    </div>
  );
};

export default PieChart;
