import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function Transaction() {
  const [transaction, setTransactions] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/transactions");
      setTransactions(response.data.transaction);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/v1/transactions", {
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
      await axios.delete(`http://localhost:8000/api/v1/transactions/${_id}`);
      fetchTransactions();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Transactions</h1>

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
    </div>
  );
}

export default Transaction;
