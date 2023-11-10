const getAllGoals = (req, res)=>{
console.log(req.body)
res.status(200).json({
    message: "Goal api"
})}

const createGoal = (req, res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
        
    }
    res.status(201).json({
    message: "Goal create api"
})}
const updateGoal = (req, res)=>res.status(200).json({
    message: "Goal update api"
})
const deleteGoal = (req, res)=>res.status(200).json({
    message: "Goal delete api",
    id : req.params.id
})



module.exports = {
    getAllGoals,
    createGoal,
    updateGoal,
    deleteGoal
}