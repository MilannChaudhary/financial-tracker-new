import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Transaction() {
  const [transaction, setTransactions] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/transactions`, {
        description,
        amount: Number(amount),
        type,
      });
      setDescription("");
      setAmount("");
      fetchTransactions();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (_id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/transactions/${_id}`);
      fetchTransactions();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Transactions</h1>
      <Link to="/dashboard" className="btn btn-outline-secondary mb-3">
        ← Back to Dashboard
      </Link>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <select className="form-control" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Transaction
        </button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {transaction.map((t) => (
            <tr key={t._id}>
              <td>{t.description}</td>
              <td>${t.amount}</td>
              <td>{t.type}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(t._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-outline-danger" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Transaction;
