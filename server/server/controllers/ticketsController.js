const Ticket = require('../models/ticket');
const Comment = require('../models/comment');

// Function to filter out empty fields from the request body
const filterEmptyFields = (data) => {
  const filteredData = {};
  for (const key in data) {
    if (data[key] !== "") {
      filteredData[key] = data[key];
    }
  }
  return filteredData;
};

const getTickets = async (req, res) => {
  try {
    const role = req.session?.user.role;
    let tickets;
    
    if (role === "customer") {
      tickets = await Ticket.find({ user: req.session?.user._id }).sort({ createdAt: -1 });
    } else {
      tickets = await Ticket.find().sort({ createdAt: -1 });
    }
    
    if (!tickets || tickets.length === 0) {
      return res.status(404).json({error: "No tickets available"})
    }
    res.status(200).json(tickets)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  
};

const getTicket = async (req, res) => {
  try {
    const role = req.session?.user.role;
    const roles = ['superAdmin', 'admin', 'supportAgent']
    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
      return res.status(404).json({error: "Ticket not found"})
    }
    if (ticket.user._id.toString() !== req.session?.user._id && !roles.includes(role) ) {
      return res.status(403).json({error: "Not Authorized to view ticket"})
    }
    res.status(200).json(ticket)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  
};

const createTicket = async (req, res) => {
  try {
    const ticketData = req.body

    if (!ticketData) {
      return res.status(400).json({error: "Please add ticket data like title and description"})
    }
  
    const ticket = await Ticket.create({
      ...ticketData,
      user: req.session?.user._id,
    })
  
    res.status(201).json(ticket)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    const roles = ['superAdmin', 'admin', 'supportAgent'];
    const role = req.session?.user.role;

    if (!ticket) {
      return res.status(404).json({error: "Ticket not found"});
    }
  
    if (ticket.user._id.toString() !== req.session?.user._id && !roles.includes(role)) {
      return res.status(403).json({error: "Not Authorized"});
    }

    await Comment.deleteMany( { ticket: ticket._id } );

    await ticket.remove();
  
    res.status(200).json({ message: 'Ticket and comment messages deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
    const { title, description, category, imageURL } = req.body;

    if (!ticket) {
      return res.status(404).json({error: "Ticket not found"})
    }
  
    if (ticket.user._id.toString() !== req.session?.user._id) {
      return res.status(403).json({error: "Not Authorized"})
    }

    if (!title || title === "") {
      return res.status(400).json({ error: 'Title field must not be empty' });
    }

    if (!description || description === "") {
      return res.status(400).json({ error: 'Description field must not be empty' });
    }

    if (!category || category === "") {
      return res.status(400).json({ error: 'Category field must not be empty' });
    }

    const newData = { title, description, category, imageURL };

    // // Filter out empty fields
    // const filteredData = filterEmptyFields(newData);

    // // Check if there is any data left to update
    // if (Object.keys(filteredData).length === 0) {
    //   return res.status(400).json({ error: 'Please provide data to update like title' });
    // }

    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      newData,
      { new: true }
    )
  
    res.status(200).json(updatedTicket)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateStatusPriorityAssignedTo = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    const roles = ['superAdmin', 'admin', 'supportAgent'];
    const userRole = req.session?.user.role;
    const { status, priority, assignToSelf } = req.body;
    const newData = { status, priority };
    
    const loggedUserTicket = ticket?.user._id.toString() === req.session?.user._id;

    if (!ticket) {
      return res.status(404).json({error: "Ticket not found"});
    }
  
    if ( ( ( !loggedUserTicket || priority || assignToSelf ) && !roles.includes(userRole) ) ) {
      return res.status(403).json({error: "Not Authorized"});
    }
    
    if (assignToSelf && (assignToSelf !== "yes" && assignToSelf !== "no") ) {
      return res.status(400).json({ error: 'Please provide a value of either yes or no for assign to self' });
    }

    // Filter out empty fields
    const filteredData = filterEmptyFields(newData);

    if (assignToSelf && assignToSelf === "yes" && !ticket?.assignedUser) {
      filteredData.assignedUser = req.session?.user?._id;
    } else if (assignToSelf && assignToSelf === "no" && ticket?.assignedUser?._id.toString() === req.session?.user?._id) {
      filteredData.$unset = { assignedUser: 1 };
    }

    // Check if there is any data left to update
    if (Object.keys(filteredData).length === 0) {
      return res.status(400).json({ error: 'Please provide data to update like status' });
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      filteredData,
      { new: true }
    )
  
    res.status(200).json(updatedTicket)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
  updateStatusPriorityAssignedTo
};