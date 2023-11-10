const express = require("express");
const { getAllGoals, createGoal, updateGoal, deleteGoal } = require("../controllers/GoalController");

const router = express.Router()

router.route("/").get(getAllGoals).post(createGoal)

router.route("/:id").put(updateGoal).delete(deleteGoal)

module.exports = router;