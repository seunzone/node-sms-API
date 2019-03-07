import ExpressValidator from 'express-validator/check';
import Contact from '../models/contact';

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

export const validateContactUser = async (req, res, next) => {
  try {
    const name = await Contact.findOne({ name: req.body.name });
    if (name) {
      return res.status(409).json({
        message: 'Name already exists'
      });
    }
    const phoneNumber = await Contact.findOne({ phoneNumber: req.body.phoneNumber });
    if (phoneNumber) {
      return res.status(409).json({
        message: 'Phone Number already exists'
      });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
  next();
};

export const validateContactId = (req, res, next) => {
  if (req.params.contactId.match(/^[0-9a-fA-F]{24}$/) == null) {
    return res.status(400).json({
      message: 'This id is invalid'
    });
  }
  next();
};

