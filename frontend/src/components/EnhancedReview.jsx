import { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { FaStar, FaThumbsUp, FaThumbsDown, FaEdit, FaTrash, FaTimes, FaCheck } from 'react-icons/fa';
import { useUpdateReviewMutation, useDeleteReviewMutation, useVoteReviewHelpfulnessMutation } from '../redux/slices/reviewSlices';
import { useGetCurrentUserQuery } from '../redux/slices/userSlices';
import toast from 'react-hot-toast';

const EnhancedReview = ({ review, onDelete }) => {
  const [updateReview] = useUpdateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();
  const [voteReviewHelpfulness] = useVoteReviewHelpfulnessMutation();
  const { data: user = [] } = useGetCurrentUserQuery();
  const currentUser = user?.user || {};
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingRating, setEditingRating] = useState(review?.MovieRate || 0);
  const [hoverRating, setHoverRating] = useState(0);

  const isOwner = review?.user_id?._id === currentUser?._id;
  const userVote = review?.votedUsers?.find(vote => vote.user_id === currentUser?._id);

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  const handleEdit = async (values) => {
    try {
      const result = await updateReview({
        id: review._id,
        updateReview: {
          MovieReview: values.comment,
          MovieRate: editingRating,
          MovieId: review.MovieId
        }
      });

      if (result.data?.status) {
        toast.success('Review updated successfully');
        setIsEditing(false);
      } else {
        toast.error(result.data?.message || 'Failed to update review');
      }
    } catch (error) {
      toast.error('Error updating review');
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this review?')) {
      try {
        const result = await deleteReview(review._id);
        if (result.data?.status) {
          toast.success('Review deleted successfully');
          if (onDelete) onDelete(review._id);
        } else {
          toast.error(result.data?.message || 'Failed to delete review');
        }
      } catch (error) {
        toast.error('Error deleting review');
        console.error(error);
      }
    }
  };

  const handleVote = async (voteType) => {
    try {
      const result = await voteReviewHelpfulness({
        reviewId: review._id,
        voteType
      });

      if (result.data?.status) {
        toast.success('Vote recorded');
      } else {
        toast.error(result.data?.message || 'Failed to vote');
      }
    } catch (error) {
      toast.error('Error voting on review');
      console.error(error);
    }
  };

  const StarRating = ({ rating, onRatingChange, interactive = false }) => {
    return (
      <div className="flex items-center gap-1">
        {Array(5).fill(0).map((_, index) => {
          const starValue = index + 1;
          return (
            <FaStar
              key={index}
              className={`${
                (interactive ? (hoverRating || editingRating) : rating) >= starValue
                  ? 'text-yellow-400'
                  : 'text-gray-400'
              } ${interactive ? 'cursor-pointer hover:text-yellow-300' : ''} transition-colors`}
              onClick={interactive ? () => setEditingRating(starValue) : undefined}
              onMouseEnter={interactive ? () => setHoverRating(starValue) : undefined}
              onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
            />
          );
        })}
        {interactive && (
          <span className="ml-2 text-sm text-gray-400">
            {editingRating}/5
          </span>
        )}
      </div>
    );
  };

  if (isEditing) {
    return (
      <div className="bg-[#161D2F] rounded-lg p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-white">Edit Review</h4>
          <button
            onClick={() => setIsEditing(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        <Formik
          initialValues={{ comment: review.MovieReview }}
          onSubmit={handleEdit}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Rating
                </label>
                <StarRating
                  rating={editingRating}
                  onRatingChange={setEditingRating}
                  interactive={true}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Review Comment
                </label>
                <Field
                  as="textarea"
                  name="comment"
                  rows="4"
                  className="w-full p-3 bg-[#0E1628] text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FC4747] resize-none"
                  placeholder="Share your thoughts about this movie..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FaCheck />
                  Update Review
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <FaTimes />
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }

  return (
    <div className="bg-[#0E1628]/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 shadow-lg hover:shadow-xl">
      {/* Review Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src="/public/images/avatarProfile.png"
              className="w-14 h-14 rounded-full border-2 border-[#FC4747]/30 shadow-lg"
              alt="User Avatar"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-[#0E1628]"></div>
          </div>
          <div>
            <h4 className="font-bold text-white text-lg">{review?.user_id?.username}</h4>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <span className="font-medium">{formatDate(review?.createdAt)}</span>
              {review?.isEdited && (
                <span className="text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-full text-xs font-medium">
                  edited {formatDate(review?.editedAt)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Owner Actions */}
        {isOwner && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
              title="Edit Review"
            >
              <FaEdit />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
              title="Delete Review"
            >
              <FaTrash />
            </button>
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="mb-4">
        <StarRating rating={review?.MovieRate} />
      </div>

      {/* Review Content */}
      <p className="text-gray-300 mb-4 leading-relaxed">
        {review?.MovieReview}
      </p>

      {/* Helpfulness Voting */}
      {!isOwner && currentUser?._id && (
        <div className="flex items-center justify-between pt-6 border-t border-gray-600/30">
          <span className="text-sm text-gray-400 font-medium">Was this review helpful?</span>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleVote('helpful')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 font-medium ${
                userVote?.voteType === 'helpful'
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-gray-700/50 text-gray-300 hover:bg-green-500/20 hover:text-green-400 hover:shadow-md'
              }`}
            >
              <FaThumbsUp className="text-sm" />
              <span className="text-sm">{review?.helpfulVotes || 0}</span>
            </button>

            <button
              onClick={() => handleVote('not_helpful')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 font-medium ${
                userVote?.voteType === 'not_helpful'
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'bg-gray-700/50 text-gray-300 hover:bg-red-500/20 hover:text-red-400 hover:shadow-md'
              }`}
            >
              <FaThumbsDown className="text-sm" />
              <span className="text-sm">{review?.notHelpfulVotes || 0}</span>
            </button>
          </div>
        </div>
      )}

      {/* Helpfulness Display for Owner or Non-logged Users */}
      {(isOwner || !currentUser?._id) && (
        <div className="flex items-center gap-6 pt-6 border-t border-gray-600/30">
          <div className="flex items-center gap-2 bg-green-500/10 px-3 py-2 rounded-xl">
            <FaThumbsUp className="text-green-400" />
            <span className="text-green-400 font-medium">{review?.helpfulVotes || 0}</span>
            <span className="text-gray-400 text-sm">helpful</span>
          </div>
          <div className="flex items-center gap-2 bg-red-500/10 px-3 py-2 rounded-xl">
            <FaThumbsDown className="text-red-400" />
            <span className="text-red-400 font-medium">{review?.notHelpfulVotes || 0}</span>
            <span className="text-gray-400 text-sm">not helpful</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedReview;
