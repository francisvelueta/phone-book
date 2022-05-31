const router = require('express').Router();
const isRepeated = require('../middleware/isRepeatedField');
const verifyToken = require('../middleware/verifyToken');
const { validateRequestWith } = require('../middleware/validate');
const {
  User,
  validateRegisterUser,
  validateLogin,
  validateEmail,
  validatePassword,
} = require('../models/user');
const {
  newUser,
  loginUser,
  requestReset,
  resetPassword,
  infoUser,
} = require('../controllers/users');

router.post(
  '/register',
  [validateRequestWith(validateRegisterUser), isRepeated(User, 'email')],
  newUser,
);
router.post('/login', validateRequestWith(validateLogin), loginUser);
router.get('/me', verifyToken('Login'), infoUser);
router.post('/requestReset', validateRequestWith(validateEmail), requestReset);
router.put(
  '/resetPassword/:token',
  verifyToken('Reset'),
  validateRequestWith(validatePassword),
  resetPassword,
);
module.exports = router;
