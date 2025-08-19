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
        min: 1,
        max: 5
    },
    helpfulVotes: {
        type: Number,
        default: 0
    },
    notHelpfulVotes: {
        type: Number,
        default: 0
    },
    votedUsers: [{
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        voteType: {
            type: String,
            enum: ['helpful', 'not_helpful']
        }
    }],
    isEdited: {
        type: Boolean,
        default: false
    },
    editedAt: {
        type: Date
    }
},
    {
        timestamps: true,
    });

exports.reviewModel = mongoose.model("Review", reviewSchema);