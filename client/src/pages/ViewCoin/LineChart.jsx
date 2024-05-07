import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import React from 'react'

const LineChart = ({data}) => {
  return (
    <Line
      sx={{ width: "50%"  }}
      data={{
        labels: data.map((entry) => entry[0]),
        datasets: [
          {
            label: "Price",
            data: data.map((entry) => entry[1]),
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
            backgroundColor: "gray.500)",
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
          title: {
            display: true,
            text: "Price History Of Year",
          },
        },
      }}
    />
  );
    
  
}

export default LineChart