const Ticket = require('../models/ticket');

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
      return res.status(404).json({error: "You don't have any tickets"})
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

    if (!ticket) {
      return res.status(404).json({error: "Ticket not found"})
    }
  
    if (ticket.user._id.toString() !== req.session?.user._id) {
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
  
    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      req.body,
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
  updateTicket
};