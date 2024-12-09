import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    PointElement,
    LineElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    ArcElement,
    PointElement,
    LineElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
);

const PieChart = ({ data }) => {
    const chartData = {
        labels: ["Married", "Single", "Divorced"],
        datasets: [
            {
                data: [
                    data.filter((item) => item.marital_status === "Married")
                        .length,
                    data.filter((item) => item.marital_status === "Single")
                        .length,
                    data.filter((item) => item.marital_status === "Divorced")
                        .length,
                ],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
        ],
    };

    return <Pie data={chartData} />;
};

export default PieChart;
