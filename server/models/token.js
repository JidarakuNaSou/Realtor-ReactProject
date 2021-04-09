const mongoose =require("mongoose");
const Schema = mongoose.Schema

const TokenSchema = new Schema({
    tokenId: {
        type: String
    },
    user_id:{
        type: String
    },
})

module.exports = Token = mongoose.model("Token",TokenSchema)