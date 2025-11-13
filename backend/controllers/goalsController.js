const Goal = require('../models/Common');

// Create new goal
exports.createGoal = async (req, res) => {
    try {
        const goal = new Goal(req.body);
        const savedGoal = await goal.save();
        res.status(201).json(savedGoal);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all goals
exports.getGoals = async (req, res) => {
    try {
        const goals = await Goal.find();
        res.status(200).json(goals);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a goal
exports.updateGoal = async (req, res) => {
    try {
        const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedGoal);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a goal
exports.deleteGoal = async (req, res) => {
    try {
        await Goal.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Goal deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
