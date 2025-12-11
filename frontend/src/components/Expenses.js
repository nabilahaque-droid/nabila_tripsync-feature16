import React from "react";
import { useParams } from "react-router-dom";

const Expenses = () => {
  const { id } = useParams(); // Get trip ID from URL

  return (
    <div style={{ padding: "20px" }}>
      <h1>Trip Expenses</h1>
      <h3>Trip ID: {id}</h3>

      <p>This page will list all expenses for this trip.</p>
    </div>
  );
};

export default Expenses;

