const jwt = require("jsonwebtoken");
const {tokens,secret} = require("../config/config").jwt;
const uuid = require("uuid/v4")

const mongoose =require("mongoose");

const Token = require("../models/token");

const generateAccessToken = (user_id) => {
    const payload = {
        user_id,
        type: tokens.access.type
    };
    const option = {expiresIn: tokens.access.expiresIn};
    return jwt.sign(payload,secret,option);
}

const generateRefreshToken = (user_id) => {
    const payload = {
        id: uuid(),
        type: tokens.refresh.type
    };
    const option = {expiresIn: tokens.refresh.expiresIn};

    return {
        id: payload.id,
        tokens: jwt.sign(payload,secret,option)
    }
}

const replaceDbRefreshToken = (tokenId,user_id) => 
    Token.findOneAndDelete({user_id})
    .exec()
    .then(() => {Token.create({tokenId,user_id})})

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    replaceDbRefreshToken
}