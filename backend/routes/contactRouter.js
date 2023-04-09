const express=require('express');
const { addContact, getAllContacts, updateContact, deleteContact } = require('../controllers/contactController');

const router=express.Router();


router.route('/contact').post(addContact);
router.route('/contact').get(getAllContacts)
router.route('/contact/:id').patch(updateContact)
router.route('/contact/:id').delete(deleteContact)

module.exports=router;