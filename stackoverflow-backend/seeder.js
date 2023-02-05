const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Load models
const Bootcamp = require("./models/BootcampModel");
const Course = require("./models/CourseModel");
const User = require("./models/UserModel");
const Review = require("./models/ReviewModel");

// Connect to DB
const DB = process.env.MONGO_URI
mongoose.set('strictQuery', false);
mongoose.connect(DB, {
    useNewUrlParser: true,
}).then(
    (conn) => {console.log(`MongoDB Connected: ${conn.connection.host}`)}
);

// Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8"));
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8"));
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8"));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/_data/reviews.json`, "utf-8"));

// Import into DB
const importData = async ()=> {
    try {
        await Bootcamp.create(bootcamps);
        await Course.create(courses);
        await User.create(users);
        await Review.create(reviews);
        console.log("Data Imported...");
        process.exit();
    } catch (err) {
        console.log(err)
    };
};

// Delete data
const deleteData = async ()=> {
    try {
        await Bootcamp.deleteMany();
        await Course.deleteMany();
        await User.deleteMany();
        await Review.deleteMany();
        console.log("Data Destroyed...");
        process.exit();
    } catch (err) {
        console.log(err)
    };
};

if (process.argv[2] === "-i") {
    console.log("importing...")
    importData();
} else if (process.argv[2] === "-d") {
    console.log("deleting...")
    deleteData();
};

