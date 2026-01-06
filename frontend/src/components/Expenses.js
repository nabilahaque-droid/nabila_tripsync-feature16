import React, { useState, useEffect } from "react";
import { addExpense, getExpensesByTrip, deleteExpense } from "../api/expenses";

const Expenses = ({ tripId, budget }) => {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ category: "Food", amount: "", note: "" });

  useEffect(() => {
    loadExpenses();
  }, [tripId]);

  const loadExpenses = async () => {
    const data = await getExpensesByTrip(tripId);
    setExpenses(data);
  };

  const handleAdd = async () => {
    if (!form.amount) return;
    await addExpense({ ...form, tripId });
    setForm({ category: "Food", amount: "", note: "" });
    loadExpenses();
  };

  const handleDelete = async (id) => {
    await deleteExpense(id);
    loadExpenses();
  };

  // Calculate totals
  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div>
      <h2>💰 Expenses</h2>
      <p><strong>Budget:</strong> ${budget}</p>
      <p><strong>Spent:</strong> ${totalSpent}</p>
      <p style={{ color: totalSpent > budget ? "red" : "green" }}>
        <strong>Remaining:</strong> ${budget - totalSpent}
      </p>

      <div style={{ marginBottom: "10px" }}>
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          style={{ padding: "5px", marginRight: "5px" }}
        >
          <option>Food</option>
          <option>Transport</option>
          <option>Accommodation</option>
          <option>Activities</option>
          <option>Shopping</option>
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: parseFloat(e.target.value) })}
          style={{ width: "80px", padding: "5px" }}
        />
        <button onClick={handleAdd} style={{ marginLeft: "5px" }}>Add</button>
      </div>

      <ul style={{ maxHeight: "200px", overflowY: "auto" }}>
        {expenses.map((ex) => (
          <li key={ex._id} style={{ borderBottom: "1px solid #ccc", padding: "5px 0" }}>
            <span>{ex.category}: ${ex.amount}</span>
            <button onClick={() => handleDelete(ex._id)} style={{ float: "right", fontSize: "0.8rem", background:"red", color:"white", border:"none", borderRadius:"3px" }}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Expenses;

