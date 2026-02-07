const router = require('express').Router();
const { signUp, signIn } = require('../controllers/users');
const { validateUserSignUp, validateUserSignIn } = require('../middlewares/validation');

router.post('/signup', validateUserSignUp, signUp);
router.post('/signin', validateUserSignIn, signIn);

module.exports = router;
