import React from "react";
import { Scatter } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Title,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Title
);

const ScatterChart = ({ data }) => {
    const scatterData = {
        datasets: [
            {
                label: "Age vs Income",
                data: data.map((item) => ({
                    x: item.age,
                    y: item.income,
                })),
                backgroundColor: "rgba(54, 162, 235, 0.6)",
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Age vs Income",
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Age",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Income",
                },
            },
        },
    };

    return <Scatter data={scatterData} options={options} />;
};

export default ScatterChart;
