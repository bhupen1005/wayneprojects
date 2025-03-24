import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const renderCustomAxisTick = ({
  x,
  y,
  payload,
}: {
  x: number;
  y: number;
  payload: { value: string };
}) => {
  let path = "";

  switch (payload.value) {
    case "Page A":
      path =
        "M899.072 99.328q9.216 13.312 17.92 48.128t16.384 81.92 13.824 100.352 11.264 102.912 9.216 90.112 6.144 60.928q4.096 30.72 7.168 70.656t5.632 79.872 4.096 75.264 2.56 56.832q-13.312 16.384-30.208 25.6t-34.304 11.264-34.304-2.56-30.208-16.896q-1.024-10.24-3.584-33.28t-6.144-53.76-8.192-66.56-8.704-71.68q-11.264-83.968-23.552-184.32-7.168 37.888-11.264 74.752-4.096 31.744-6.656 66.56t-0.512 62.464q1.024 18.432 3.072 29.184t4.608 19.968 5.12 21.504 5.12 34.304 5.12 56.832 4.608 90.112q-11.264 24.576-50.688 42.496t-88.576 29.696-97.28 16.896-74.752 5.12q-18.432 0-46.08-2.56t-60.416-7.168-66.048-12.288-61.952-17.92-49.664-24.064-28.16-30.208q2.048-55.296 5.12-90.112t5.632-56.832 5.12-34.304 5.12-21.504 4.096-19.968 3.584-29.184q2.048-27.648-0.512-62.464t-6.656-66.56q-4.096-36.864-11.264-74.752-13.312 100.352-24.576 184.32-5.12 35.84-9.216 71.68t-8.192 66.56-6.656 53.76-2.56 33.28q-13.312 12.288-30.208 16.896t-34.304 2.56-33.792-11.264-29.696-25.6q0-21.504 2.048-56.832t4.096-75.264 5.632-79.872 6.656-70.656q2.048-20.48 6.144-60.928t9.728-90.112 11.776-102.912 13.824-100.352 16.384-81.92 17.92-48.128q20.48-12.288 56.32-25.6t73.216-26.624 71.168-25.088 50.176-22.016q10.24 13.312 16.896 61.44t13.312 115.712 15.36 146.432 23.04 153.6l38.912-334.848-29.696-25.6 43.008-54.272 15.36 2.048 15.36-2.048 43.008 54.272-29.696 25.6 38.912 334.848q14.336-74.752 23.04-153.6t15.36-146.432 13.312-115.712 16.896-61.44q16.384 10.24 50.176 22.016t71.168 25.088 73.216 26.624 56.32 25.6";
      break;
    case "Page B":
      path =
        "M662.528 451.584q10.24 5.12 30.208 16.384t46.08 31.744 57.856 52.736 65.024 80.896 67.072 115.2 64.512 154.624q-15.36 9.216-31.232 21.504t-31.232 22.016-31.744 15.36-32.768 2.56q-44.032-9.216-78.336-8.192t-62.976 7.68-53.248 16.896-47.616 19.968-46.08 16.384-49.664 6.656q-57.344-1.024-110.592-16.896t-101.376-32.256-89.6-25.088-75.264 4.608q-20.48 8.192-41.984 1.024t-38.912-18.432q-20.48-13.312-39.936-33.792 37.888-116.736 86.016-199.68t92.672-136.704 78.848-81.408 43.52-33.792q9.216-5.12 10.24-25.088t-1.024-40.448q-3.072-24.576-9.216-54.272l-150.528-302.08 180.224-29.696q27.648 52.224 53.76 79.36t50.176 36.864 45.568 5.12 39.936-17.92q43.008-30.72 80.896-103.424l181.248 29.696q-20.48 48.128-45.056 99.328-20.48 44.032-47.616 97.28t-57.856 105.472q-12.288 34.816-13.824 57.344t1.536 36.864q4.096 16.384 12.288 25.6z";
      break;
    case "Page C":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x={x - 12}
          y={y + 4}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#666"
          className="icon icon-tabler icons-tabler-filled icon-tabler-briefcase"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M22 13.478v4.522a3 3 0 0 1 -3 3h-14a3 3 0 0 1 -3 -3v-4.522l.553 .277a20.999 20.999 0 0 0 18.897 -.002l.55 -.275zm-8 -11.478a3 3 0 0 1 3 3v1h2a3 3 0 0 1 3 3v2.242l-1.447 .724a19.002 19.002 0 0 1 -16.726 .186l-.647 -.32l-1.18 -.59v-2.242a3 3 0 0 1 3 -3h2v-1a3 3 0 0 1 3 -3h4zm-2 8a1 1 0 0 0 -1 1a1 1 0 1 0 2 .01c0 -.562 -.448 -1.01 -1 -1.01zm2 -6h-4a1 1 0 0 0 -1 1v1h6v-1a1 1 0 0 0 -1 -1z" />
        </svg>
      );
      break;
    case "Page D":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x={x - 10} // x and y values move the icon relative to the tick
          y={y + 4}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#666"
          className="icon icon-tabler icons-tabler-filled icon-tabler-shopping-cart"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M6 2a1 1 0 0 1 .993 .883l.007 .117v1.068l13.071 .935a1 1 0 0 1 .929 1.024l-.01 .114l-1 7a1 1 0 0 1 -.877 .853l-.113 .006h-12v2h10a3 3 0 1 1 -2.995 3.176l-.005 -.176l.005 -.176c.017 -.288 .074 -.564 .166 -.824h-5.342a3 3 0 1 1 -5.824 1.176l-.005 -.176l.005 -.176a3.002 3.002 0 0 1 1.995 -2.654v-12.17h-1a1 1 0 0 1 -.993 -.883l-.007 -.117a1 1 0 0 1 .883 -.993l.117 -.007h2zm0 16a1 1 0 1 0 0 2a1 1 0 0 0 0 -2zm11 0a1 1 0 1 0 0 2a1 1 0 0 0 0 -2z" />
        </svg>
      );
      break;
    case "Page E":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x={x - 12}
          y={y + 4}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#666"
          className="icon icon-tabler icons-tabler-filled icon-tabler-cardboards"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M19 5a3 3 0 0 1 3 3v8.5a3.5 3.5 0 0 1 -3.5 3.5h-1.062a4 4 0 0 1 -3.118 -1.504l-1.54 -1.92a1 1 0 0 0 -1.56 0l-1.538 1.917a4 4 0 0 1 -3.122 1.507h-1.06a3.5 3.5 0 0 1 -3.5 -3.5v-8.5a3 3 0 0 1 3 -3zm-11 5a2 2 0 0 0 -1.995 1.85l-.005 .15a2 2 0 1 0 2 -2m8 0a2 2 0 0 0 -1.995 1.85l-.005 .15a2 2 0 1 0 2 -2" />
        </svg>
      );
      break;
    case "Page F":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x={x - 12}
          y={y + 4}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#666"
          className="icon icon-tabler icons-tabler-filled icon-tabler-car-crane"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3.06 5.66l.035 -.085l.07 -.125l.033 -.048l.063 -.075l.064 -.065l.098 -.079l.106 -.065l.067 -.033l.048 -.02l.139 -.041l18.053 -3.01a1 1 0 0 1 1.164 .986v2a1 1 0 0 1 -2 0v-.82l-13.802 2.3l1.25 .626a1 1 0 0 1 .552 .894l-.001 3h2.001v-4a1 1 0 0 1 1 -1h4a6 6 0 0 1 6 6v5a1 1 0 0 1 -1 1h-1.17a3.001 3.001 0 0 1 -5.66 0h-6.34a3.001 3.001 0 0 1 -5.83 -1v-5a1 1 0 0 1 1 -1v-4.99a1 1 0 0 1 .06 -.35m1.94 10.34a1 1 0 1 0 0 2a1 1 0 0 0 0 -2m12 0a1 1 0 1 0 .992 1.124l.008 -.132l-.007 -.109a1 1 0 0 0 -.993 -.883m-.652 -7.985l.895 2.985h2.63l-.042 -.155a4 4 0 0 0 -3.223 -2.8z" />
        </svg>
      );
      break;
    case "Page G":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x={x - 12}
          y={y + 4}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#666"
          className="icon icon-tabler icons-tabler-filled icon-tabler-cactus"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M7 22a1 1 0 0 1 -.117 -1.993l.117 -.007h2v-6a4 4 0 0 1 -3.995 -3.8l-.005 -.2v-1a1 1 0 0 1 1.993 -.117l.007 .117v1a2 2 0 0 0 1.85 1.995l.15 .005v-7a3 3 0 0 1 5.995 -.176l.005 .176v10a2 2 0 0 0 1.995 -1.85l.005 -.15v-5a1 1 0 0 1 1.993 -.117l.007 .117v5a4 4 0 0 1 -3.8 3.995l-.2 .005v3h2a1 1 0 0 1 .117 1.993l-.117 .007h-10z" />
        </svg>
      );
      break;

    default:
      path = "";
  }

  return (
    <svg
      x={x - 12}
      y={y + 4}
      width={24}
      height={24}
      viewBox="0 0 1024 1024"
      fill="#666"
    >
      <path d={path} />
    </svg>
  );
};
const renderCustomBarLabel = ({
  payload,
  x,
  y,
  width,
  height,
  value,
}: {
  payload: any;
  x: number;
  y: number;
  width: number;
  height: number;
  value: number;
}) => {
  return (
    <text
      x={x + width / 2}
      y={y}
      fill="#666"
      textAnchor="middle"
      dy={-6}
    >{`value: ${value}`}</text>
  );
};
const LineChartComp = () => {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },

    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  // In above data uv means user visits, pv means page views, amt means amount.

  // we pass the array data in the data prop of LineChart component. The data prop takes an array of objects, where each object represents a data point on the chart. Each object have a name key, which represents the x-axis value, and a uv key, which represents the y-axis value.

  return (
    <>
      {/* *************************************************************** */}
      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, bottom: 5, left: 0 }} // margin is for the space around the chart
      >
        {/* you can have one or more lines to represent the data on the graph, try commenting the below line */}
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        <Line type="monotone" dataKey="amt" stroke="#8884d8" />
        {/* Below is the grid lines in the chart */}
        {/* stroke is the color of the grid lines */}
        {/* strokeDasharray is for the dashed lines in the grid */}
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        {/* Below is the name of the entity with which all the data points are associated */}
        <XAxis dataKey="name" />
        <YAxis />
        {/* Below is the tooltip that appears when you hover over the data points */}
        <Tooltip />
      </LineChart>
      {/* *************************************************************** */}
      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, bottom: 5, left: 0 }} // margin is for the space around the chart
      >
        {/* you can have one or more lines to represent the data on the graph, try commenting the below line */}
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        <Line type="monotone" dataKey="amt" stroke="#8884d8" />
        {/* Below is the grid lines in the chart */}
        {/* stroke is the color of the grid lines */}
        {/* strokeDasharray is for the dashed lines in the grid */}
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        {/* Below is the name of the entity with which all the data points are associated */}
        <XAxis dataKey="name" tick={renderCustomAxisTick} />
        <YAxis />
        {/* Below is the tooltip that appears when you hover over the data points */}
        <Tooltip />
      </LineChart>
      {/* *************************************************************** */}
      <BarChart
        width={600}
        height={400}
        data={data}
        margin={{ top: 50, right: 30, bottom: 5, left: 0 }}
      >
        <XAxis dataKey="name" tick={renderCustomAxisTick} />
        <YAxis />
        <Bar
          dataKey="uv"
          barSize={30} // barSize is the width of the bars
          fill="#8884d8"
          // below label prop is for the custom label on the bars
          label={renderCustomBarLabel}
        />
      </BarChart>
      {/* *************************************************************** */}
      <BarChart
        width={600}
        height={400}
        data={data}
        margin={{ top: 50, right: 30, bottom: 5, left: 0 }}
      >
        <XAxis dataKey="name" tick={renderCustomAxisTick} />
        <YAxis />
        <Bar
          dataKey="uv"
          barSize={30} // barSize is the width of the bars
          fill="#8884d8"

          // below label prop is for the custom label on the bars
        />
        <Bar
          dataKey="pv"
          barSize={30} // barSize is the width of the bars
          fill="#2224d8"

          // below label prop is for the custom label on the bars
        />
        <Tooltip
          wrapperStyle={{
            backgroundColor: "black",
            color: "white",
            borderRadius: "5px",
          }}
          trigger="hover"
        />
      </BarChart>
      {/* *************************************************************** */}
      <BarChart
        width={600}
        height={400}
        data={data}
        margin={{ top: 50, right: 30, bottom: 5, left: 0 }}
      >
        <XAxis dataKey="name" tick={renderCustomAxisTick} />
        <YAxis />
        <Bar
          dataKey="uv"
          barSize={30} // barSize is the width of the bars
          fill="#8884d8"

          // below label prop is for the custom label on the bars
        />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        {/* Custom tooltip */}
        <Tooltip
          content={(props: any) => {
            return (
              <div>
                <p>{props.payload[0]?.value}</p>
              </div>
            );
          }}
          wrapperStyle={{
            // below is the style for the tooltip
            backgroundColor: "black",
            color: "white",
            borderRadius: "50%",
            padding: "5px",
            width: "100px",
            height: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          trigger="click"
        />
      </BarChart>
      {/* *************************************************************** */}
      <BarChart
        width={600}
        height={500}
        data={data}
        margin={{ top: 100, right: 30, bottom: 5, left: 0 }}
      >
        <XAxis dataKey="name" tick={renderCustomAxisTick} />
        <YAxis />
        <Bar
          dataKey="uv"
          barSize={30} // barSize is the width of the bars
          fill="#8884d8"

          // below label prop is for the custom label on the bars
        />
        <Bar
          dataKey="uv"
          barSize={30} // barSize is the width of the bars
          fill="teal"

          // below label prop is for the custom label on the bars
        />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        {/* Below Legent is generated automatically */}
        <Legend
          width={100}
          wrapperStyle={{
            top: 40,
            right: 20,
            backgroundColor: "#f5f5f5",
            border: "1px solid #d5d5d5",
            borderRadius: 3,
            lineHeight: "40px",
          }}
        />
        {/* Custom tooltip */}
        <Tooltip
          content={(props: any) => {
            return (
              <div>
                <p>{props.payload[0]?.value}</p>
              </div>
            );
          }}
          wrapperStyle={{
            // below is the style for the tooltip
            backgroundColor: "black",
            color: "white",
            borderRadius: "50%",
            padding: "5px",
            width: "100px",
            height: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          trigger="hover"
        />
      </BarChart>
    </>
  );
};

export default LineChartComp;
