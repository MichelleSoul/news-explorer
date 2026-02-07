const router = require('express').Router();
const {
  getSavedArticles,
  saveArticle,
  deleteArticle,
} = require('../controllers/articles');
const { validateSaveArticle } = require('../middlewares/validation');

// Get all saved articles
router.get('/', getSavedArticles);

// Save a new article
router.post('/', validateSaveArticle, saveArticle);

// Delete a saved article
router.delete('/:articleId', deleteArticle);

module.exports = router;
