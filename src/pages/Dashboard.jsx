import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";

function Dashboard() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? <p>Welcome, {user.name}!</p> : <p>Not logged in</p>}
      <Link to="/transaction">Go to transactions</Link>;
    </div>
  );
}

export default Dashboard;
