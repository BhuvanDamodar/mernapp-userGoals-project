const asyncHandler = require("express-async-handler")
const goalModel = require("../models/GoalModel")

// @access - private
const getAllGoals = asyncHandler(async (req, res) => {
    const goals = await goalModel.find({ user: req.user.id })
    res.status(200).json(goals)
})

// @access - private
const createGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')

    }

    const goal = await goalModel.create({
        userName: req.user.name,
        text: req.body.text,
        user: req.user.id
    })
    res.status(201).json(goal)
})

// @access - private
const updateGoal = asyncHandler(async (req, res) => {
    try {
        const goal = await goalModel.findById(req.params.id)
        if (!goal) {
            res.status(400)
            throw new Error('Goal not found')
        }

        if (!req.user) {
            res.status(400)
            throw new Error('User not found')
        }

        if (goal.user.toString() !== req.user.id) {
            res.status(401)
            throw new Error('User not authorized')
        }
        const updatedGoal = await goalModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(updatedGoal)
    }
    catch (error) {
        res.status(400)
        throw new Error('Invalid Id')
    }
})

// @access - private
const deleteGoal = asyncHandler(async (req, res) => {
    try {
        const goal = await goalModel.findById(req.params.id)
        if (!goal) {
            res.status(400)
            throw new Error('Goal not found')
        }

        if (!req.user) {
            res.status(400)
            throw new Error('User not found')
        }

        if (goal.user.toString() !== req.user.id) {
            res.status(401)
            throw new Error('User not authorized')
        }

        await goalModel.deleteOne({ _id: req.params.id })
        res.status(200).json({
            message: `Goal with id:${req.params.id} deleted successfully`
        })
    } catch (error) {
        res.status(404)
        throw new Error(`Goal with id:${req.params.id} not found`)
    }
})



module.exports = {
    getAllGoals,
    createGoal,
    updateGoal,
    deleteGoal
}