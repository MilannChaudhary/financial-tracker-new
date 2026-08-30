import React, { useContext } from "react";
import UserContext from "../context/UserContext";

function Dashboard() {
  const { user } = useContext(UserContext);
  return (
    <div>
      <h1>Dashboard</h1>
      {user ? <p>Welcome, {user.name}!</p> : <p>Not logged in</p>}
    </div>
  );
}

export default Dashboard;
