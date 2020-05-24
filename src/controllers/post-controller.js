import Post from '../models/post';
import createError from 'http-errors';
import { validationResult } from 'express-validator';

export const index = async (req, res, next) => {
  const user_id = req.user.id;

  try {
    let post = await Post.findAll({
      where: { user_id },
      include: { association: 'author' },
    });

    if (post === -1) throw createError(404, 'posts not a found');

    return res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};
export const store = async (req, res, next) => {
  const errors = validationResult(req);

  if (!(await errors.isEmpty())) {
    return next(createError(400, errors.errors[0].msg));
  }

  const user_id = req.user.id;
  const { body } = req.body;

  try {
    const post = await Post.create({ body, user_id });

    return res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};
export const findOne = async (req, res, next) => {
  const user_id = req.user.id;
  const { id } = req.params;

  try {
    const post = await Post.findOne({
      where: { id, user_id },
    });

    if (!post) throw createError(404, 'post not a found');

    return res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};
export const update = async (req, res, next) => {
  const errors = validationResult(req);

  if (!(await errors.isEmpty())) {
    return next(createError(400, errors.errors[0].msg));
  }

  const user_id = req.user.id;
  const { id } = req.params;
  const { body } = req.body;

  try {
    const post = await Post.findOne({ where: { id, user_id } });

    if (!post) throw createError(404, 'post not a found');

    await post.update({ body }, { where: id });

    return res.status(202).json(post);
  } catch (error) {
    next(error);
  }
};

export const destroy = async (req, res, next) => {
  const user_id = req.user.id;
  const { id } = req.params;

  try {
    const post = await Post.findOne({
      where: { id, user_id },
    });

    if (!post) throw createError(404, 'post not a found');

    await post.destroy({ where: { id } });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
