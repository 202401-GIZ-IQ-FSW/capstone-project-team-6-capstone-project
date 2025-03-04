const Comment = require('../models/comment');
const Ticket = require('../models/ticket');

// Function to filter out empty fields from the request body
// const filterEmptyFields = (data) => {
//   const filteredData = {};
//   for (const key in data) {
//     if (data[key] !== "") {
//       filteredData[key] = data[key];
//     }
//   }
//   return filteredData;
// };

const getComments = async (req, res) => {
  try {
    const ticketId = req.ticketId;
    const loggedUser = req.session?.user;
    const comments = await Comment.find({ ticket: ticketId });
    
    if (!comments || comments.length === 0) {
      return res.status(404).json({error: "No comments available"});
    }

    if ( loggedUser.role === "customer" && comments[0]?.ticket?.user?._id.toString() !== loggedUser._id ) {
      return res.status(403).json({error: "Not authorized to view comments"});
    }

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  
};

const getComment = async (req, res) => {
  try {
    const loggedUser = req.session?.user;
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({error: "Comment not found"});
    }

    if ( loggedUser.role === "customer" && comment?.ticket?.user?._id.toString() !== loggedUser._id ) {
      return res.status(403).json({error: "Not authorized to view comment"});
    }

    res.status(200).json(comment)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createComment = async (req, res) => {
  try {
    const loggedUser = req.session?.user;

    const ticketId = req.ticketId.toString();
    
    const ticket = await Ticket.findOne( { _id: ticketId } );

    if (!ticket) {
      return res.status(404).json({error: "Ticket not found"});
    }

    if ( loggedUser.role === "customer" && ticket?.user?._id.toString() !== loggedUser._id ) {
      return res.status(403).json({error: "Not authorized to comment"});
    }

    const commentData = req.body;

    if (!commentData) {
      return res.status(400).json({error: "Comment message field must not be empty"})
    }
  
    const comment = await Comment.create({
      ...commentData,
      ticket: req.ticketId,
      user: req.session?.user._id
    })
  
    res.status(201).json(comment)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateComment = async (req, res) => {
    try {
      const loggedUser = req.session?.user;
      const comment = await Comment.findById(req.params.id);
    
      if (!comment) {
        return res.status(404).json({error: "Comment not found"});
      }
    
      if ( comment?.user?._id.toString() !== loggedUser._id || ( loggedUser.role === "customer" && comment?.ticket?.user?._id.toString() !== loggedUser._id ) ) {
        return res.status(403).json({error: "Not authorized to update comment"});
      }

      const { message, imageURL } = req.body;

      // // Filter out empty fields
      // const filteredMessage = filterEmptyFields({ message : message });
  
      // // Check if there is any data left to update
      // if (Object.keys(filteredMessage).length === 0) {
      //   return res.status(400).json({ error: 'Please provide data to update like Message' });
      // }

      if (!message || message === "") {
        return res.status(400).json({ error: 'Comment message field must not be empty' });
      }

      const newData = { message, imageURL } ;

      const updatedComment = await Comment.findByIdAndUpdate(
        req.params.id,
        newData,
        { new: true }
      )
    
      res.status(200).json(updatedComment)
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

const deleteComment = async (req, res) => {
  try {
    const loggedUser = req.session?.user;
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({error: "Comment not found"});
    }

    if ( loggedUser.role === "customer" && ( comment?.ticket?.user?._id.toString() !== loggedUser._id || comment?.user?._id.toString() !== loggedUser._id )) {
      return res.status(403).json({error: "Not authorized to delete comment"});
    }

    await comment.remove();

    res.status(200).json({ message: 'Comment deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment
};