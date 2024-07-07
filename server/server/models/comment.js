const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true // Removes whitespace from both ends of a string
    },
    imageURL: {
        type: String,
        trim: true
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Ticket',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

function autoPopulateFields(next) {
  this.populate({
    path: 'ticket user',
    select: '-password'
  });
  next();
}

commentSchema
  .pre('findOne', autoPopulateFields)
  .pre('find', autoPopulateFields)
  .pre('findById', autoPopulateFields)
  .pre('findOneAndUpdate', autoPopulateFields)
  .pre('save', autoPopulateFields);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;