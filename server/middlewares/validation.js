const { Joi, celebrate } = require('celebrate');
const validator = require('validator');

// URL Validator
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

// Sign Up validation
module.exports.validateUserSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.email': 'The "email" field must be a valid email',
      'string.empty': 'The "email" field must be filled in',
    }),
    password: Joi.string().required().min(1).messages({
      'string.empty': 'The "password" field must be filled in',
    }),
    username: Joi.string().required().min(2).max(30).messages({
      'string.min': 'The minimum length of the "username" field is 2',
      'string.max': 'The maximum length of the "username" field is 30',
      'string.empty': 'The "username" field must be filled in',
    }),
  }),
});

// Sign In validation
module.exports.validateUserSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.email': 'The "email" field must be a valid email',
      'string.empty': 'The "email" field must be filled in',
    }),
    password: Joi.string().required().messages({
      'string.empty': 'The "password" field must be filled in',
    }),
  }),
});

// Save Article validation
module.exports.validateSaveArticle = celebrate({
  body: Joi.object().keys({
    url: Joi.string().required().custom(validateURL).messages({
      'string.empty': 'The "url" field must be filled in',
      'string.uri': 'The "url" field must be a valid url',
    }),
    tag: Joi.string().required().min(1).max(50).messages({
      'string.min': 'The minimum length of the "tag" field is 1',
      'string.max': 'The maximum length of the "tag" field is 50',
      'string.empty': 'The "tag" field must be filled in',
    }),
    image: Joi.string().required().custom(validateURL).messages({
      'string.empty': 'The "image" field must be filled in',
      'string.uri': 'The "image" field must be a valid url',
    }),
    date: Joi.string().required().messages({
      'string.empty': 'The "date" field must be filled in',
    }),
    title: Joi.string().required().messages({
      'string.empty': 'The "title" field must be filled in',
    }),
    description: Joi.string().required().messages({
      'string.empty': 'The "description" field must be filled in',
    }),
    source: Joi.string().required().messages({
      'string.empty': 'The "source" field must be filled in',
    }),
  }),
});

// Delete Article validation (URL parameter)
module.exports.validateArticleUrl = celebrate({
  params: Joi.object().keys({
    url: Joi.string().required().custom(validateURL).messages({
      'string.uri': 'Invalid URL format in params',
    }),
  }),
});
