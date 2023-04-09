const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    unique: true,
    required: true,
  },
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;