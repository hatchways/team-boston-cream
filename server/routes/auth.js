const router = require('express').Router();

const { validateRegister, validateLogin } = require('../validate');
const protect = require('../middleware/auth');
const {
  registerUser,
  loginUser,
  googleAuth,
  googleRedirect,
  loadUser,
  logoutUser,
} = require('../controllers/auth');

router.route('/register').post(validateRegister, registerUser);

router.route('/google').get(googleAuth)

router.route('/google/redirect').get(googleRedirect)

router.route('/login').post(validateLogin, loginUser);

router.route('/user').get(protect, loadUser);

router.route('/logout').get(logoutUser);

module.exports = router;
