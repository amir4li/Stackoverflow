const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload");
const questionRouter = require("./routes/questionRouter");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const commentRouter = require("./routes/commentRouter");
const errorHandler = require("./middleware/error");

// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');


const app = express();
app.use(express.json());

// Swagger api docs
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
};

// Enable cors
app.use(cors());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent xss attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100
});
app.use(limiter);

// prevent http param polution
app.use(hpp());

// File uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/api/v1/questions", questionRouter); 
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/comments", commentRouter);

app.use(errorHandler);


module.exports = app;

