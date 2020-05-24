import User from '../models/user';
import createError from 'http-errors';
import { validationResult } from 'express-validator';

export const index = async (req, res, next) => {
  try {
    const users = await User.findAll({});

    if (users === -1) throw createError(400, 'Users not a found');

    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const findOne = async (req, res, next) => {
  const { id } = req.user;

  try {
    const user = await User.findOne({ where: { id } });

    if (!user) throw createError(400, 'problems');

    const { username, email } = user;

    return res.status(200).json({ username, email });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  const errors = validationResult(req);

  if (!(await errors.isEmpty())) {
    return next(createError(400, errors.errors[0].msg));
  }

  const { id } = req.user;
  const { username, email, password } = req.body;

  try {
    const user = await User.update(
      { username, email, password },
      { where: { id } }
    );

    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

export const destroy = async (req, res, next) => {
  const { id } = req.user;

  try {
    let user = await User.destroy({ where: { id } });

    return res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
};
