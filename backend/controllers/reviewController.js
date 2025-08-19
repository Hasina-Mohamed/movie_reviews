const { reviewModel } = require("../model/reviewModel");


exports.createReview = async (req, res) => {
    try {
        const { MovieRate, MovieId, MovieReview } = req.body;
        const user_id = req.userId;
        const review = await reviewModel.create({ MovieRate, MovieId, MovieReview, user_id : user_id })
        if (!review) {
            return res.status(404).json({
                status: false,
                message: 'review not create'
            })
        }

        return res.status(200).json({
            status: true,
            message: 'review  created'
        })

    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
}

exports.updateReview = async (req, res) => {
    try {
        const { MovieRate, MovieId, MovieReview } = req.body;
        const id = req.params.id;
        const user_id = req.userId;
        
        const isExistReview = await reviewModel.findById({ _id: id })

        if (!isExistReview) {
            return res.status(404).json({
                status: false,
                message: 'review not exist'
            })
        }

        // Check if the user is the owner of the review
        if (isExistReview.user_id.toString() !== user_id) {
            return res.status(403).json({
                status: false,
                message: 'You can only edit your own reviews'
            })
        }

        const review = await reviewModel.updateOne({ _id: id }, {
            $set: {
                MovieId: MovieId,
                MovieRate: MovieRate,
                MovieReview: MovieReview,
                isEdited: true,
                editedAt: new Date()
            }
        })

        if (!review) {
            return res.status(404).json({
                status: false,
                message: 'review not updated'
            })
        }

        return res.status(200).json({
            status: true,
            message: 'review updated successfully'
        })

    } catch (error) {
        console.log('error updating review', error);
        res.json({
            status: false,
            message: error.message
        })
    }
}

// exports.getreview = async (req, res) => {
//     try {
//         const review = await reviewModel.find().populate('user_id')
//         if (review.length < 0) {
//             return res.status(404).json({
//                 status: false,
//                 message: 'review not found'
//             })
//         }
//         return res.status(200).json({
//             status: true,
//             review
//         })

//     } catch (error) {
//         console.log('error getting review', error);
//         res.json({
//             status: false,
//             message: error.message
//         })
//     }
// }

exports.getreview = async (req, res) => {
    try {
      const reviews = await reviewModel.find().populate('user_id');
      if (!reviews || reviews.length === 0) {
        return res.status(404).json({
          status: false,
          message: 'Reviews not found'
        });
      }
      return res.status(200).json({
        status: true,
        reviews
      });
    } catch (error) {
      console.error('Error getting reviews', error);
      res.status(500).json({
        status: false,
        message: 'Internal server error'
      });
    }
  };
  

exports.deleteReview = async (req, res) => {
    try {
        const id = req.params.id;
        const user_id = req.userId;
        const review = await reviewModel.findById({ _id: id })

        if (!review) {
            return res.status(404).json({
                status: false,
                message: 'review not exist'
            })
        }

        // Check if the user is the owner of the review
        if (review.user_id.toString() !== user_id) {
            return res.status(403).json({
                status: false,
                message: 'You can only delete your own reviews'
            })
        }

        const deleteBoard = await reviewModel.deleteOne({ _id: id })
        if (!deleteBoard) {
            return res.status(404).json({
                status: false,
                message: 'review not found'
            })
        }
        return res.status(200).json({
            status: true,
            message: 'review deleted successfully'
        })

    } catch (error) {
        console.log('error delete user review', error);
        res.json({
            status: false,
            message: error.message
        })
    }
}

// Vote on review helpfulness
exports.voteReviewHelpfulness = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { voteType } = req.body; // 'helpful' or 'not_helpful'
        const user_id = req.userId;

        const review = await reviewModel.findById(reviewId);
        if (!review) {
            return res.status(404).json({
                status: false,
                message: 'Review not found'
            });
        }

        // Check if user has already voted on this review
        const existingVoteIndex = review.votedUsers.findIndex(
            vote => vote.user_id.toString() === user_id
        );

        if (existingVoteIndex !== -1) {
            const existingVote = review.votedUsers[existingVoteIndex];
            
            // If same vote type, remove the vote
            if (existingVote.voteType === voteType) {
                review.votedUsers.splice(existingVoteIndex, 1);
                if (voteType === 'helpful') {
                    review.helpfulVotes = Math.max(0, review.helpfulVotes - 1);
                } else {
                    review.notHelpfulVotes = Math.max(0, review.notHelpfulVotes - 1);
                }
            } else {
                // Change vote type
                existingVote.voteType = voteType;
                if (voteType === 'helpful') {
                    review.helpfulVotes += 1;
                    review.notHelpfulVotes = Math.max(0, review.notHelpfulVotes - 1);
                } else {
                    review.notHelpfulVotes += 1;
                    review.helpfulVotes = Math.max(0, review.helpfulVotes - 1);
                }
            }
        } else {
            // Add new vote
            review.votedUsers.push({ user_id, voteType });
            if (voteType === 'helpful') {
                review.helpfulVotes += 1;
            } else {
                review.notHelpfulVotes += 1;
            }
        }

        await review.save();

        return res.status(200).json({
            status: true,
            message: 'Vote recorded successfully',
            helpfulVotes: review.helpfulVotes,
            notHelpfulVotes: review.notHelpfulVotes
        });

    } catch (error) {
        console.log('error voting on review', error);
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}