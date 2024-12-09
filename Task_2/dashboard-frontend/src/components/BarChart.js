import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChart = ({ data }) => {
    const formattedData = data.map((item) => ({
        ...item,
        income: parseFloat(item.income), 
    }));

    // Data grouped by division and calculate average income
    const divisionData = formattedData.reduce((acc, item) => {
        if (!acc[item.division]) {
            acc[item.division] = { totalIncome: 0, count: 0 };
        }
        acc[item.division].totalIncome += item.income;
        acc[item.division].count += 1;
        return acc;
    }, {});

    
    const divisions = Object.keys(divisionData);
    const averageIncomes = divisions.map(
        (division) =>
            divisionData[division].totalIncome / divisionData[division].count
    );

    const chartData = {
        labels: divisions,
        datasets: [
            {
                label: "Average Income",
                data: averageIncomes,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
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
                text: "Division vs Average Income",
            },
        },
        scales: {
            x: {
                stacked: true,
                ticks: {
                    autoSkip: false,
                 
                },
                title: {
                    display: true,
                    text: "Division",
                },
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: "Average Income",
                },
               
            },
        },
    };

    return <Bar data={chartData} options={options} />
};

export default BarChart;
