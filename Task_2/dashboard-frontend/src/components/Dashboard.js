import React, { useState, useEffect } from "react";
import axios from "axios";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import ScatterChart from "./ScatterChart";
import HorizontalBarChart from "./StackedBarChart";
import "./CSS/Dashboard.css";

const Dashboard = () => {
    const [activeView, setActiveView] = useState("Dashboard"); 
    const [gender, setGender] = useState("All");
    const [division, setDivision] = useState("All");
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/customers/")
            .then((response) => setData(response.data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    let totalMember = data.length;
    let maleMember = 0;
    let femaleMember = 0;

    // Data filtared by gender and division 
    const filteredData = data.filter((item) => {
        if (item.gender === "M") {
            maleMember++;
        } else {
            femaleMember++;
        }
        return (
            (gender === "All" || item.gender === gender) &&
            (division === "All" || item.division === division)
        );
    });

    return (
        <div>
            <div className="sidebar">
                <h1>Reneta</h1>
                <div>
                    <ul className="sideList">
                        <li
                            className={activeView === "Dashboard" ? "active" : ""}
                            onClick={() => setActiveView("Dashboard")}
                        >
                            Dashboard
                        </li>
                        <li
                            className={activeView === "Customer" ? "active" : ""}
                            onClick={() => setActiveView("Customer")}
                        >
                            Customer
                        </li>
                    </ul>
                </div>
            </div>
            <div className="main">
                {activeView === "Dashboard" && (
                    <div>
                        <div className="filter-container">
                            <div className="filter">
                                <label htmlFor="gender">Filter by Gender: </label>
                                <select
                                    id="gender"
                                    onChange={(e) => setGender(e.target.value)}
                                    value={gender}
                                >
                                    <option value="All">All</option>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                </select>
                            </div>
                            <div className="filter">
                                <label htmlFor="division">Filter by Division: </label>
                                <select
                                    id="division"
                                    onChange={(e) => setDivision(e.target.value)}
                                    value={division}
                                >
                                    <option value="All">All</option>
                                    <option value="Dhaka">Dhaka</option>
                                    <option value="Rajshahi">Rajshahi</option>
                                    <option value="Khulna">Khulna</option>
                                    <option value="Barishal">Barishal</option>
                                    <option value="Sylhet">Sylhet</option>
                                    <option value="Mymensingh">Mymensingh</option>
                                    <option value="Chattogram">Chattogram</option>
                                    <option value="Rangpur">Rangpur</option>
                                </select>
                            </div>
                        </div>
                        <div className="submain">
                            <div className="item1">
                                <div className="item1-1">
                                    <h5>Total Customer</h5>
                                    <p>{totalMember}</p>
                                </div>
                                <div className="item1-2">
                                    <h5>Male</h5>
                                    <p>{maleMember}</p>
                                </div>
                                <div className="item1-3">
                                    <h5>Female</h5>
                                    <p>{femaleMember}</p>
                                </div>
                            </div>
                            <div className="item2">
                                <PieChart data={filteredData} />
                            </div>
                            <div className="item3">
                            <HorizontalBarChart data={filteredData} />
                                
                            </div>
                            <div className="item4">
                            <ScatterChart data={filteredData} />
                            </div>
                            <div className="item5">
                                <BarChart data={filteredData} />
                            </div>
                        </div>
                    </div>
                )}
                {activeView === "Customer" && (
                    <div className="customer-list">
                        <h2>Customer List</h2>
                        <div className="customer-table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Gender</th>
                                    <th>Division</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((customer) => (
                                    <tr key={customer.customer_id}>
                                        <td>{customer.customer_id}</td>
                                        <td>{customer.customer_name}</td>
                                        <td>{customer.gender}</td>
                                        <td>{customer.division}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
