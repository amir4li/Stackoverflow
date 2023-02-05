const path = require("path");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geocoder");
const Question  = require("../models/QuestionModel");
const ErrorResponse = require("../utils/errorResponse");


// @desc      Get all questions
// @route     GET /api/v1/questions
// @access    Public
exports.getQuestions = asyncHandler(async (req, res, next)=> {
    const questions = await Question.find();

    res.status(200).json({
        success: true,
        data: questions
    });
});


// @desc      Get single question
// @route     GET /api/v1/questions/:id
// @access    Public
exports.getQuestion = asyncHandler(async (req, res, next)=> {
    const question = await Question.findById(req.params.id);

    if (!question) {
        return next(new ErrorResponse(`Question not found with id of ${req.params.id}`, 404));
    };

    res.status(200).json({
        success: true,
        data: Question
    });
});


// @desc      Create new question
// @route     POST /api/v1/questions/:id
// @access    Private
exports.createQuestion = asyncHandler(async (req, res, next)=> {
    // Add user to req.body
    req.body.user = req.user.id;

    const newQuestion = await Question.create(req.body);

    res.status(201).json({
        success: true,
        message: "New question created",
        data: newQuestion
    });  
});


// @desc      Update question
// @route     PUT /api/v1/questions/:id
// @access    Private
exports.updateQuestion = asyncHandler(async (req, res, next)=> {
    let question = await Question.findById(req,params.id);

    if (!question) {
        return next(new ErrorResponse(`Question not found with id of ${req.params.id}`, 404));
    };

    // Make sure user is Question owner
    if (Question.user.toSring() !== req.user.id && req.user.role !== "admin") {
        return next(new ErrorResponse(`User ${user.id} is not authorized to update this Question`, 401));
    };

    question = await Question.findOneAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        message: `Update question ${req.params.id}`,
        data: question
    });
});


// @desc      Delete question
// @route     DELETE /api/v1/questions/:id
// @access    Private
exports.deleteQuestion = asyncHandler(async (req, res, next)=> {
    const question = await Question.findById(req.params.id);

    if (!question) {
        next(new ErrorResponse(`Question not found with id of ${req.params.id}`, 404));
    };

    // Make sure user is Question owner
    if (Question.user.toSring() !== req.user.id && req.user.role !== "admin") {
        return next(new ErrorResponse(`User ${user.id} is not authorized to delete this question`, 401));
    };

    question.remove();
    
    res.status(200).json({
        success: true,
        message: `Delete question ${req.params.id}`
    });
});

