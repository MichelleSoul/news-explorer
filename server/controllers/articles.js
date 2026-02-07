const SavedArticle = require('../models/savedArticle');
const { CREATED } = require('../utils/success');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');
const InternalServerError = require('../errors/internal-server-error');

// GET /saved-news - Get all saved articles for current user
const getSavedArticles = (req, res, next) => {
  const userId = req.user._id;

  SavedArticle.find({ owner: userId })
    .then((articles) => res.send(articles))
    .catch((err) => {
      console.error(err);
      return next(new InternalServerError('An error has occurred on the server'));
    });
};

// POST /saved-news - Save a new article
const saveArticle = (req, res, next) => {
  const userId = req.user._id;
  const { url, tag, image, date, title, description, source } = req.body;

  SavedArticle.create({
    url,
    tag,
    image,
    date,
    title,
    description,
    source,
    owner: userId,
  })
    .then((article) => res.status(CREATED).send(article))
    .catch((err) => {
      console.error(err);
      if (err.code === 11000) {
        return next(new BadRequestError('This article is already saved'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Invalid article data provided'));
      }
      return next(new InternalServerError('An error has occurred on the server'));
    });
};

// DELETE /saved-news/:articleId - Delete a saved article
const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  const userId = req.user._id;

  SavedArticle.findById(articleId)
    .orFail()
    .then((article) => {
      // Check ownership
      if (article.owner.toString() !== userId) {
        return next(new ForbiddenError('You can only delete your own saved articles'));
      }

      // Delete the article
      return article.deleteOne()
        .then(() => res.send({ message: 'Article deleted successfully' }));
    })
    .catch((err) => {
      console.error(err);
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Article not found'));
      }
      if (err.name === 'CastError') {
        return next(new BadRequestError('Invalid article ID'));
      }
      return next(new InternalServerError('An error has occurred on the server'));
    });
};

module.exports = {
  getSavedArticles,
  saveArticle,
  deleteArticle,
};
