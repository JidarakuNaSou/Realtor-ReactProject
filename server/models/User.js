const mongoose =require("mongoose");
const Schema = mongoose.Schema

const UserSchema = new Schema({
    user_id:{
        type: String,
        required: true
    },
    first_name: {
        type: String
    },
    last_name:{
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    user_image: {
        type: String,
    },
    phone : {
        type: String,
    },
    date: {
        type: Date,
        default : Date.now
    },
    
})

module.exports = User = mongoose.model("users",UserSchema)