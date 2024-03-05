const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required:true
    },
    tasks:[{
        taskname:{
            type:String
        },
        taskstatus:{
            type:Boolean
        }
    }]
})

//model creation and exporting of model
const User = mongoose.model('trialstatu',userSchema);
module.exports=User;