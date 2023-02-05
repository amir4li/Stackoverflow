const mongoose = require("mongoose");
const Question = require("../models/QuestionModel");

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        trim: true,
        required: [true, "Please add a comment title"],
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    question: {
        type: mongoose.Schema.ObjectId,
        ref: "Question",
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }
});


const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;

