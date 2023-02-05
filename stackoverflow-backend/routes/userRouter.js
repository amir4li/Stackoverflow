const express = require("express");
const {
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser
} = require("../controllers/userControllers");
const User = require("../models/UserModel");

const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router.use(protect);
router.use(authorize("admin"));

router.route("/")
    .get(advancedResults(User), getUsers)
    .post(createUser)

router.route("/:id")
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;

