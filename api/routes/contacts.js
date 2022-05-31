const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const validId = require('../middleware/validateId');
const { validateRequestWith } = require('../middleware/validate');
const { validateContactRegister } = require('../models/contact');
const {
  newContact,
  getContact,
  updateContact,
  getContacts,
  deleteContact,
} = require('../controllers/contacts');

router
  .route('/')
  .all(verifyToken('Login'))
  .post(validateRequestWith(validateContactRegister), newContact)
  .get(getContacts);

router
  .route('/:id')
  .all(validId, verifyToken('Login'))
  .get(getContact)
  .put(validateRequestWith(validateContactRegister), updateContact)
  .delete(deleteContact);

module.exports = router;
