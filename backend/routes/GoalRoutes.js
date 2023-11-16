const express = require("express");
const { getAllGoals, createGoal, updateGoal, deleteGoal } = require("../controllers/GoalController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router()

router.route("/").get(protect, getAllGoals).post(protect, createGoal)

router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal)

module.exports = router;