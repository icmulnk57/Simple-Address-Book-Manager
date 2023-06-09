const express=require('express');
const { addContact, getAllContacts, updateContact, deleteContact } = require('../controllers/contactController');

const router=express.Router();
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PATCH, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

router.route('/contact').post(addContact);
router.route('/contact').get(getAllContacts)
router.route('/contact/:id').patch(updateContact)
router.route('/contact/:id').delete(deleteContact)

module.exports=router;