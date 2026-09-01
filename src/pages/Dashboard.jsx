import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import axios from "axios";

function Dashboard() {
  const { user, setUser } = useContext(UserContext);
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/transactions`);
      setTransactions(response.data.transaction);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions.filter((t) => t.type === "expense").reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const chartData = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: ["#198754", "#dc3545"],
      },
    ],
  };
  ChartJS.register(ArcElement, Tooltip, Legend);

  return (
    <div className="container mt-5">
      <h1>Dashboard</h1>
      {user ? <p>Welcome, {user.name}!</p> : <p>Not logged in</p>}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card p-3 text-center bg-success text-white">
            <h5>Total Income</h5>
            <h3>${totalIncome}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 text-center bg-danger text-white">
            <h5>Total Expenses</h5>
            <h3>${totalExpense}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 text-center bg-primary text-white">
            <h5>Balance</h5>
            <h3>${balance}</h3>
          </div>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-6">
          <Doughnut data={chartData} />
        </div>
      </div>

      <Link to="/transaction">Go to Transactions</Link>
      <button className="btn btn-outline-danger" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
