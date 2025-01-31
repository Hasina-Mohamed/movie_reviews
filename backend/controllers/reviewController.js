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
        const isExistReview = await reviewModel.findById({ _id: id })

        if (!isExistReview) {
            return res.status(404).json({
                status: false,
                message: 'review not  exist'
            })
        }

        const review = await reviewModel.updateOne({ _id: id }, {
            $set: {
                MovieId: MovieId,
                MovieRate: MovieRate,
                MovieReview: MovieReview
            }
        })

        if (!review) {
            return res.status(404).json({
                status: false,
                message: 'review not update'
            })
        }

        return res.status(200).json({
            status: true,
            message: 'review update successfully'
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
        const review = await reviewModel.findById({ _id: id })

        if (!review) {
            return res.status(404).json({
                status: false,
                message: 'review not  exist'
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