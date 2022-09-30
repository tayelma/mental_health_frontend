import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
    },
  },
};

const BarChart = () => {
  const { results, setComorbidity } = useContext(DataContext);

  console.log(results);

  let labels = [];
  let percentage = [];
  const comorbid = [];

  if (results.jsonData)
    for (const key in results.jsonData.Diagnosis) {
      // console.log(key);
      // console.log(results.jsonData.Diagnosis[key]);

      labels.push(key);
      percentage.push(parseInt(results.jsonData.Diagnosis[key] * 100));

      if (parseInt(results.jsonData.Diagnosis[key] * 100) > 50) {
        comorbid.push(key);
        // setComorbidity(comorbid);
        console.log(comorbid);
      }
    }

  console.log(labels);
  console.log(percentage);

  //get the index and associate the value with the disorder
  const indexDisorder = percentage.indexOf(Math.max(...percentage));
  console.log(Math.max(...percentage));
  console.log(indexDisorder);

  const data = {
    labels,
    datasets: [
      {
        label: "Mental Health Disorders",
        data: percentage,
        backgroundColor: [
          "rgba(39, 195, 62, 1)",
          "rgba(245, 40, 145, 0.8)",
          "rgba(245, 40, 0, 0.8)",
          "rgba(245, 198, 0, 0.8)",
          "rgba(245, 101, 255, 0.8)",
          "rgba(0, 0, 255, 0.73)",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: { title: { text: " Mental Health Disorders", display: true } },
      y: { title: { text: "Percentages of Occurance", display: true } },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
  };
  // sethighestresult(labels[indexDisorder]);

  return (
    <div>
      {results.jsonData && results.jsonData.Diagnosis ? (
        <Bar options={options} data={data} height={100} />
      ) : (
        <div>Please perform another diagnosis</div>
      )}
    </div>
  );
};

export default BarChart;
