const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userid: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    //TODO: created_quizzes and participated_quizzes these fields are no more required
    created_quizzes: [],
    participated_quizzes: [
        {
            quizid: {
                type: String,
            },
            quizname: {
                type: String,
            },
            scored_marks: {
                type: Number,
            },
            total_marks: {
                type: Number,
            },
            creator: {
                type: String,
            },
            creatorname: {
                type: String,
            },
        },
    ],
});
const User = mongoose.model("User", userSchema);
module.exports = User;
