const Op = require('Sequelize').Op;

import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import { validationResult } from 'express-validator';

import User from '../models/user';
import config from '../config/auth';

export const signUp = async (req, res, next) => {
  const errors = validationResult(req);

  if (!(await errors.isEmpty())) {
    return next(createError(400, errors.errors[0].msg));
  }

  const { username, email, password } = req.body;
  try {
    let [user, created] = await User.findOrCreate({
      where: { [Op.or]: [{ username }, { email }] },
      defaults: { username, email, password },
    });

    if (created === false) throw createError(400, 'user already exists');

    return res.status(201).json({
      token: jwt.sign({ id: user.id }, config.secret, {
        expiresIn: '1h',
      }),
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const [, hash] = req.headers.authorization.split(' ');
  const [username, password] = Buffer.from(hash, 'base64')
    .toString()
    .split(':');

  try {
    if (!username || !password) throw createError(401, 'fields invalid');

    let user = await User.findOne({ where: { username } });

    if (user && (await User.isPassword(user.password, password))) {
      return res.status(200).json({
        token: jwt.sign({ id: user.id }, config.secret, { expiresIn: '1h' }),
      });
    }
    throw createError(401, 'invalid login');
  } catch (error) {
    next(error);
  }
};
