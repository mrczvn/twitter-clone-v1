import { check } from 'express-validator';

export const signupSchema = [
  check('username', 'invalid username')
    .exists({ checkNull: true })
    .isLength({ min: 5, max: 11 })
    .withMessage('username should be at least 5 chars long')
    .custom((value, { req }) => {
      return value === req.body.username;
    }),
  check('email', 'invalid email')
    .isEmail()
    .custom((value, { req }) => {
      return value === req.body.email;
    }),
  check('password', 'invalid password')
    .exists()
    .isLength({ min: 5, max: 34 })
    .withMessage('password should be at least 5 chars long')
    .custom((value, { req }) => {
      return value === req.body.password;
    }),
];

export const userSchema = [
  check('username', 'invalid username')
    .exists({ checkNull: true })
    .isLength({ min: 5, max: 11 })
    .withMessage('username should be at least 5 chars long')
    .custom((value, { req }) => {
      return value === req.body.username;
    }),
  check('email', 'invalid email')
    .isEmail()
    .custom((value, { req }) => {
      return value === req.body.email;
    }),
  check('password', 'invalid password')
    .exists()
    .isLength({ min: 5, max: 34 })
    .withMessage('password should be at least 5 chars long')
    .custom((value, { req }) => {
      return value === req.body.password;
    }),
];

export const postSchema = [
  check('body', 'text invalid')
    .exists()
    .custom((value, { req }) => {
      return value === req.body.body;
    }),
];
