const express = require("express");
const {
    getQuestions,
    getQuestion,
    createQuestion,
    updateQuestion,
    deleteQuestion,
} = require("../controllers/questionControllers");
const Question = require("../models/QuestionModel");
const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require('../middleware/auth');


// Include other resource routers
const commentRouter = require("./commentRouter");

const router = express.Router();

// Re-route into other resource routers
router.use("./:questionId/comments", commentRouter);

router.route("/")
    .get(advancedResults(Question, "comments"), getQuestions)
    .post(protect, createQuestion)

router.route("/:id")
    .get(getQuestion)
    .put(protect, updateQuestion)
    .delete(protect, deleteQuestion)

module.exports = router;

