const express = require("express");
const {
    getComments,
    getComment,
    addComment,
    updateComment,
    deleteComment
} = require("../controllers/commentControllers");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");
const Comment = require("../models/CommentModel");

router.route("/")
    .get(advancedResults(Comment, {
        path: "question",
        select: "title description"
    }), getComments)
    .post(protect, authorize("user", "admin"), addComment);

router.route("/:id")
    .get(getComment)
    .put(protect, authorize("user", "admin"), updateComment)
    .delete(protect, authorize("user", "admin"), deleteComment);


module.exports = router;

