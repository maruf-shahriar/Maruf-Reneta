import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BarChart from "./components/BarChart";
import BarChartB from "./components/BarChartB";
//import logo from './logo.svg';
import "./App.css";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<BarChart />} />
                    <Route path="/sales" element={<BarChartB />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
