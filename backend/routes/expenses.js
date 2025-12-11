const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");

// Create expense
router.post("/", expenseController.createExpense);

// Get expenses for a trip
router.get("/:tripId", expenseController.getExpensesByTrip);

// Delete expense
router.delete("/:id", expenseController.deleteExpense);

module.exports = router;
