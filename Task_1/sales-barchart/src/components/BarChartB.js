import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Papa from "papaparse";
import axios from "axios";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    Title,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    Title
);

const BarChartB = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQezTR_DMqTNgx_Lo1j7xA0Pc6XmW65QbdrMIqG4-0GM4_-uTDJuCOuEJO1_4yKtRwarQaZG090rWfK/pub?gid=75884643&single=true&output=csv"
                );
                Papa.parse(response.data, {
                    header: true,
                    complete: (result) => {
                        processChartData(result.data);
                    },
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const processChartData = (data) => {
            const currentMonthData = [];
            const previousMonthData = [];
            for (let i = 0; i < data.length; i++) {
                const row = data[i];
                const [day, month, year] = row.Date.split("/").map(Number); // Here i change the date format to dd/mm/yyyy because the date function by default take the date in mm/dd/yyyy format
                const itemdate = new Date(year, month - 1, day);
                const nowDate = new Date();
                const itemMonth = itemdate.getMonth(); // getMONTH() function return the month in 0-11 format
                const nowMonth = nowDate.getMonth();

                if (
                    nowMonth - itemMonth === 1 ||
                    nowMonth - itemMonth === -11
                ) {
                    currentMonthData.push({
                        product: row.Product,
                        sales: Number(row.MonthSales),
                    });
                } else {
                    previousMonthData.push({
                        product: row.Product,
                        sales: Number(row.MonthSales),
                    });
                }
            }

            const products = [
                "aaa",
                "ooo",
                "rtt",
                "ghh",
                "dww",
                "ytt",
                "eee",
                "qyy",
                "prp",
                "hgt",
                // ...new Set(
                //     [...currentMonthData, ...previousMonthData].map(
                //         (d) => d.product
                //     )
                // ),

                /* Here i write product name harcoded because when i use dynamnic code it not like the give picture */
            ];

            const currentSales = products.map((product) => {
                const match = currentMonthData.find(
                    (d) => d.product === product
                );
                return match ? match.sales : 0;
            }); //Here i match the product name with the current month data.

            const previousSales = products.map((product) => {
                const match = previousMonthData.find(
                    (d) => d.product === product
                );
                return match ? match.sales : 0;
            }); //Here i match the product name with the previous month data.

            setChartData({
                labels: products,
                datasets: [
                    {
                        label: "Current Month Sales",
                        data: currentSales,
                        type: "bar",
                        backgroundColor: "blue",
                        borderWidth: 1,
                        order: 1,
                    },
                    {
                        label: "Previous Month Sales",
                        data: previousSales,
                        type: "line",
                        borderColor: "red",
                        fill: false,
                        order: 0,
                    },
                ],
            });
        };

        fetchData();
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                align: "end",
                maxWidth: 10,
                labels: {
                    boxWidth: 12,
                    font: {
                        size: 12,
                    },
                    pointStyle: "circle",
                },
            },
            title: {
                display: true,
                text: "Current & Previous Month Sales by Product",
                align: "start",
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
                    text: "Values",
                },
                ticks: {
                    stepSize: 5,
                },
                suggestedMin: 0,
                suggestedMax: 20,
            },
        },
    };

    return (
        <div>
            <h1>Bar Chart B</h1>
            <div style={{ height: "80%", width: "80%", margin: "50px" }}>
                {chartData ? (
                    <Bar data={chartData} options={options} />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default BarChartB;
