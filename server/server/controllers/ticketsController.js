const Ticket = require('../models/ticket');

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
      tickets = await Ticket.find({ user: req.session?.user._id });
    } else {
      tickets = await Ticket.find();
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
      return res.status(403).json({error: "Not Authorized"})
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
    const ticket = await Ticket.findById(req.params.id)
    const roles = ['superAdmin', 'admin', 'supportAgent']
    const role = req.session?.user.role;

    if (!ticket) {
      return res.status(404).json({error: "Ticket not found"})
    }
  
    if (ticket.user._id.toString() !== req.session?.user._id && !roles.includes(role)) {
      return res.status(403).json({error: "Not Authorized"})
    }
  
    await ticket.remove()
  
    res.status(200).json({ message: 'Ticket deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
      return res.status(404).json({error: "Ticket not found"})
    }
  
    if (ticket.user._id.toString() !== req.session?.user._id) {
      return res.status(403).json({error: "Not Authorized"})
    }

    // Filter out empty fields
    const filteredData = filterEmptyFields(req.body);

    // Check if there is any data left to update
    if (Object.keys(filteredData).length === 0) {
      return res.status(400).json({ error: 'Please provide data to update like title' });
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

const updateTicketStatus = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
    const roles = ['superAdmin', 'admin', 'supportAgent']
    const role = req.session?.user.role;

    if (!ticket) {
      return res.status(404).json({error: "Ticket not found"})
    }
  
    if (ticket.user._id.toString() !== req.session?.user._id && !roles.includes(role) ) {
      return res.status(403).json({error: "Not Authorized"})
    }
    
    // Filter out empty fields
    const filteredData = filterEmptyFields(req.body);

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
  updateTicketStatus
};