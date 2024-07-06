const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema(
  {
    number: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true,
      maxlength: 80,
      trim: true // Removes whitespace from both ends of a string
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      enum: ['General Inquiry', 'Technical', 'Bug Report'],
      default: 'General Inquiry'
    },
    status: {
      type: String,
      required: true,
      enum: ['Open', 'In Progress', 'Closed'],
      default: 'Open',
    },
    priority: {
      type: String,
      required: true,
      enum: ['Low', 'Medium', 'High', 'Urgent', 'Critical'],
      default: 'Low'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    assignedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

function autoPopulateUsers(next) {
  this.populate({
    path: 'user assignedUser',
    select: '-password'
  });
  next();
}

ticketSchema
  .pre('findOne', autoPopulateUsers)
  .pre('find', autoPopulateUsers)
  .pre('findById', autoPopulateUsers)
  .pre('findOneAndUpdate', autoPopulateUsers)
  .pre('save', autoPopulateUsers);

// Middleware to set the ticket number before validation
ticketSchema.pre('validate', async function(next) {
  if (this.isNew) {
    const lastTicket = await mongoose.model('Ticket').findOne().sort({ number: -1 }).exec();
    this.number = lastTicket ? lastTicket.number + 1 : 1;
  }
  next();
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;