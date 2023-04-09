const Contact = require('../models/contactdb');

// Add a new contact
exports.addContact = async (req, res) => {
  try {
    const { name, mobile } = req.body;

    // Check if contact already exists with given mobile number
    const existingContact = await Contact.findOne({ mobile });
    if (existingContact) {
      return res.status(400).json({ message: 'Contact already exists' });
    }

    // Create new contact
    const contact = new Contact({ name, mobile });
    await contact.save();

    res.status(201).json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all contacts in ascending order of name
exports.getAllContacts = async (req, res) => {
  try {
    const { filter } = req.query;

    // Find all contacts and sort by name
    let contacts = await Contact.find().sort({ name: 1 });

    // Filter by name and mobile number if filter query is provided
    if (filter) {
      const regex = new RegExp(filter, 'i');
      contacts = contacts.filter((contact) => regex.test(contact.name)|| regex.test(contact.mobile));
    }
    
  
    

    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update a contact
exports.updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, mobile } = req.body;

    // Find contact by id
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    // Check if new mobile number is already in use
    if (mobile !== contact.mobile) {
      const existingContact = await Contact.findOne({ mobile });
      if (existingContact) {
        return res.status(400).json({ message: 'Mobile number already in use' });
      }
    }

    // Update contact and save to database
    contact.name = name;
    contact.mobile = mobile;
    await contact.save();

    res.json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a contact
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    // Find contact by id and remove from database
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json({ message: 'Contact deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

