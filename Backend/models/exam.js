const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
    quizid: {
        type: String,
        required: true,
    },
    userid: {
        type: String,
        required: true,
    },
    username: {
        type: String,
    },
    attempted_list: {},
    scored_marks: {
        type: Number,
        default: 0,
    },
    total_mcq_marks: {
        type: Number,
        default: 0,
    },
    total_marks: {
        type: Number,
        default: 0,
    },
    non_mcq: {
        type: Boolean,
    },
    attempted: {
        type: Boolean, 
        default: false,
    },
    non_mcq_marks_added: {
        type: Boolean,
        default: false,
    },
});

const Result = mongoose.model("Result", resultSchema);
module.exports = Result;
