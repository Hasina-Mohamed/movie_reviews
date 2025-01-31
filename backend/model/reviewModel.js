const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    MovieId: {
        type: Number,
        required: [true, "Please add the Movie id"],
    },
    MovieReview: {
        type: String,
        required: [true, "Please add the review of the Movie"],
    },
    MovieRate: {
        type: Number,
        required: [true, "Please add the rate of the Movie"],
    }
},
    {
        timestamps: true,
    });

exports.reviewModel = mongoose.model("Review", reviewSchema);