import ReactEcharts from "echarts-for-react"


const Attendance = {
  grid: { top: 20, right: 40, bottom: 20, left: 40 },
  xAxis: {
    type: "category",
    data: ["Present", "Absent", "WFH", "WFO"]
  },
  yAxis: {
    type: "value"
  },
  series: [
    {
      data: [80, 10, 30, 40, 20],
      type: "bar",
      smooth: true,
      color: [
        '#CB3837',
      ]
    }
  ],
  tooltip: {
    trigger: "axis"
  }
}

function App() {
  return (
<div className="main">

  <div className="cards">
  


  </div>


<div className="graphat"> 
    <ReactEcharts
      option={Attendance}
      style={{ width: "700px", height: "300px" }}
    ></ReactEcharts>
    </div>

    </div>
  )
}

export default App
