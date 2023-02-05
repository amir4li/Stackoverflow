const mongoose = require("mongoose");
// const slugify = require("slugify");


const QuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add a title."],
        trim: true,
        maxlength: [50, "Name can not be more than 50 character"]
    },
    description: {
        type: String,
        required: [true, "Please add a description of the question."],
        trim: true,
        minlength: [20, "Description required minimum 20 characters"]
    },
    tags: {
        type: [String],
        required: [true, "Please add some tags to the question."],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// // Create bootcamp slug from the name
// QuestionSchema.pre("save", function(next) {
//     this.slug = slugify(this.name, { lower: true });
//     next();
// });

// Cascade delete courses when a bootcamp is deleted
QuestionSchema.pre("remove", async function(next) {
    await this.model("Comment").deleteMany({ question: this._id });
    next();
});

// Reverse populate with virtuals
QuestionSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "question",
    justOne: false
});

const Question = mongoose.model('Question', QuestionSchema);
module.exports = Question;

