import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const HorizontalBarChart = ({ data }) => {
    const ageRanges = [
        { range: "Below 30", min: 0, max: 29 },
        { range: "30-40", min: 30, max: 40 },
        { range: "40-50", min: 41, max: 50 },
    ];

    const maritalStatuses = [
        ...new Set(data.map((item) => item.marital_status)),
    ];
    const groupedData = maritalStatuses.map((status) => {
        return {
            label: status,
            data: ageRanges.map(
                (range) =>
                    data.filter(
                        (item) =>
                            item.age >= range.min &&
                            item.age <= range.max &&
                            item.marital_status === status
                    ).length
            ),
            backgroundColor:
                status === "Married"
                    ? "rgba(75, 192, 192, 0.6)"
                    : status === "Single"
                    ? "rgba(255, 99, 132, 0.6)"
                    : "rgba(153, 102, 255, 0.6)", 
        };
    });

    const chartData = {
        labels: ageRanges.map((range) => range.range),
        datasets: groupedData,
    };

    const options = {
        maintainAspectRatio: false,
        indexAxis: "y", 
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Age Ranges vs Marital Status",
            },
        },
        scales: {
            x: {
                stacked: true,
                title: {
                    display: true,
                    text: "Count",
                },
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: "Age Range",
                },
                ticks: {
                    autoSkip: false, 
                    font: {
                        size: 14, 
                    },
                },
            },
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default HorizontalBarChart;
