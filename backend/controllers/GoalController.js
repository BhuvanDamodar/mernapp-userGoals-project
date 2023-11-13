const asyncHandler = require("express-async-handler")
const goalModel = require("../models/GoalModel")

// @access - private
const getAllGoals = asyncHandler(async(req, res)=>{
const goals = await goalModel.find()
res.status(200).json(goals)
})

// @access - private
const createGoal = asyncHandler(async(req, res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
        
    }
    const goal = await goalModel.create({
        text: req.body.text
    })
    res.status(201).json(goal)
})

// @access - private
const updateGoal = asyncHandler(async(req, res)=>{
    try{
    const updatedGoal = await goalModel.findByIdAndUpdate(req.params.id, req.body,{new: true})
    res.status(200).json(updatedGoal)
    } 
    catch(error){
        res.status(400)
        throw new Error('Invalid Id')
    }
})

// @access - private
const deleteGoal = asyncHandler(async(req, res)=>{
    try{
    await goalModel.deleteOne({_id:req.params.id})
    res.status(200).json({
        message: `Goal with id:${req.params.id} deleted successfully`
    })
    } catch(error){
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