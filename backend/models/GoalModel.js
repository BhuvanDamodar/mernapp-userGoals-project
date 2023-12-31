const mongoose = require("mongoose")

const goalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'userModel'
    },

    userName: {
        type: String,
        required: true,
        ref: 'userModel'
    },

    text:{
        type: String,
        required: [true, "Please add a text value"]
    }   
},{
    timestamps: true
})

module.exports = mongoose.model('goalModel', goalSchema);