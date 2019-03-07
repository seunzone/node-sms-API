import ExpressValidator from 'express-validator/check';

const { check, validationResult } = ExpressValidator;

const getErrors = (req, next) => {
  const errors = validationResult(req)
    .array()
    .map(error => error.msg);
  if (!errors.length) {
    return next();
  }
  return errors;
};

export const returnJsonErrors = async (req, res, next) => {
  const result = getErrors(req, next);
  return Array.isArray(result) ? res.status(400).json({ errors: result, status: 'error' }) : result;
};

export const validateContact = [
  check('name')
    .isString()
    .withMessage('Email must be alphanumeric characters.')
    .isLength({ min: 3, max: 40 })
    .withMessage('name must be at least 3 characters long and not more than 40'),

  check('phoneNumber')
    .isNumeric()
    .withMessage('Phone Number can only contain numbers')
    .isLength({ min: 11 })
    .withMessage('Phone Number must be at least 11 characters long')
];

export const validateSms = [
  check('message')
    .isString()
    .withMessage('message is required')
    .isLength({ min: 3, max: 400 })
    .withMessage('name must be at least 3 characters long and not more than 400'),

  check('receiver')
    .isNumeric()
    .withMessage('Phone number must be a number')
];
