const router = require('express').Router();
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');

const authRouter = require('./auth');
const usersRouter = require('./users');
const articlesRouter = require('./articles');

// Public routes
router.use('/', authRouter);

// Protected routes
router.use(auth);

router.use('/users', usersRouter);
router.use('/saved-news', articlesRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Resource not found'));
});

module.exports = router;
