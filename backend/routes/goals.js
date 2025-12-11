const express = require('express');
const router = express.Router();
const Goal = require('../models/Common'); 

// GET /goals Fetch all goals
router.get('/', async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /goals - Add a new goal
router.post('/', async (req, res) => {
  const goal = new Goal({
    name: req.body.name
  });

  try {
    const newGoal = await goal.save();
    res.status(201).json(newGoal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /goals/:id - Delete a goal
router.delete('/:id', async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ message: 'Goal not found' });

    await goal.deleteOne();
    res.json({ message: 'Goal deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

