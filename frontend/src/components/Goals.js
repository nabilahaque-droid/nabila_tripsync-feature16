import React, { useState, useEffect } from "react";
import { getGoals, createGoal, deleteGoal } from "../api/goals";

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");

  // Fetch all goals when component mounts
  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const data = await getGoals();
      setGoals(data);
    } catch (err) {
      console.error("Error fetching goals:", err);
    }
  };

  const handleAddGoal = async () => {
    if (!newGoal) return;
    try {
      const data = await createGoal({ name: newGoal });
      setGoals([...goals, data]);
      setNewGoal("");
    } catch (err) {
      console.error("Error creating goal:", err);
      alert("Failed to add goal. Is the backend running?");
    }
  };

  const handleDeleteGoal = async (id) => {
    try {
      await deleteGoal(id);
      setGoals(goals.filter((goal) => goal._id !== id));
    } catch (err) {
      console.error("Error deleting goal:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Travel Goals</h2>
      <input
        type="text"
        placeholder="Enter a goal"
        value={newGoal}
        onChange={(e) => setNewGoal(e.target.value)}
      />
      <button onClick={handleAddGoal}>Add Goal</button>

      <ul>
        {goals.map((goal) =>
          goal && goal.name ? (
            <li key={goal._id}>
              {goal.name}{" "}
              <button onClick={() => handleDeleteGoal(goal._id)}>Delete</button>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};

export default Goals;

