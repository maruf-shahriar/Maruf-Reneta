import React, { useState, useEffect } from "react";
import BarChartB from "./BarChartB";
import { Bar } from "react-chartjs-2";
import Papa from "papaparse";
import axios from "axios";
import {
    Chart as ChartJS,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from "chart.js";

ChartJS.register(Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const BarChart = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const googleSheetURL =
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vQezTR_DMqTNgx_Lo1j7xA0Pc6XmW65QbdrMIqG4-0GM4_-uTDJuCOuEJO1_4yKtRwarQaZG090rWfK/pub?gid=1343703575&single=true&output=csv";

        const fetchData = async () => {
            try {
                const response = await axios.get(googleSheetURL);
                Papa.parse(response.data, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        const parsedData = results.data;
                        console.log("Parsed Data:", parsedData);

                        parsedData.sort(
                            (a, b) =>
                                Number(b.TotalSales) - Number(a.TotalSales)
                        );

                        // Data extract from the parsed data
                        const labels = parsedData.map((row) => row.Product);
                        const totalSales = parsedData.map((row) =>
                            Number(row.TotalSales)
                        );
                        const totalValue = parsedData.map((row) =>
                            Number(row.TotalValue)
                        );
                        const maxTotalValue = Math.max(...totalValue);
                        // Data set to the chart
                        setChartData({
                            labels,
                            datasets: [
                                {
                                    label: "Total Sales",
                                    data: totalSales,
                                    backgroundColor: totalValue.map((value) => {
                                        const intensity =
                                            (value / maxTotalValue) * 255;
                                        return `rgba(${intensity}, 39, 4, 1)`;
                                    }),
                                    borderWidth: 1,
                                },
                            ],
                        });
                    },
                });
            } catch (error) {
                console.error("Error fetching Google Sheet data:", error);
            }
        };

        fetchData();
    }, []);

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const datasetIndex = tooltipItem.datasetIndex;
                        const dataIndex = tooltipItem.dataIndex;
                        return `Product: ${chartData.labels[dataIndex]}, TotalSales: ${chartData.datasets[datasetIndex].data[dataIndex]}`;
                    },
                },
            },
            legend: {
                display: true,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Product",
                },
                grid: {
                    drawOnChartArea: false, 
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Total Sales",
                },
            },
        },
    };

    return (
        <div>
            <h1>Bar Chart A</h1>
            <div style={{ width: "80%", margin: "50px" }}>
                {chartData ? (
                    <Bar data={chartData} options={options} />
                ) : (
                    <p>Loading data...</p>
                )}
            </div>
            <BarChartB />
        </div>
    );
};

export default BarChart;
