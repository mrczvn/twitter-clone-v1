import Comment from '../models/comments';
import createError from 'http-errors';
import { validationResult } from 'express-validator';

export const store = async (req, res, next) => {
  // ('/:id/comments')
  const errors = validationResult(req);

  if (!(await errors.isEmpty())) {
    return next(createError(400, errors.errors[0].msg));
  }

  const user_id = req.user.id;
  const post_id = req.params.id;
  const { body } = req.body;

  try {
    const comment = await Comment.create({
      body,
      user_id,
      post_id,
    });

    return res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

export const index = async (req, res, next) => {
  // ('/:id/comments')
  const user_id = req.user.id;
  const post_id = req.params.id;

  try {
    const comments = await Comment.findAll({
      where: { user_id, post_id },
      // include: [{ association: 'owner' }, { association: 'post' }],
    });

    if (comments === -1) throw createError(404, 'comments not a found');

    return res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const findOne = async (req, res, next) => {
  // ('/:post_id/comment/:comment_id')
  const user_id = req.user.id;
  const id = req.params.comment_id;
  const { post_id } = req.params;

  try {
    const comment = await Comment.findOne({
      where: { id, user_id, post_id },
      // include: [{ association: 'owner' }, { association: 'post' }],
    });

    if (!comment) throw createError(404, 'post not a found');

    return res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  // ('/:post_id/comment/:comment_id')
  const errors = validationResult(req);

  if (!(await errors.isEmpty())) {
    return next(createError(400, errors.errors[0].msg));
  }

  const user_id = req.user.id;
  const id = req.params.comment_id;
  const { post_id } = req.params;
  const { body } = req.body;

  try {
    let comment = await Comment.findOne({
      where: { id, post_id, user_id },
    });

    if (!comment) throw createError(404, 'comment not a found');

    await comment.update(
      { body },
      {
        where: { id },
      }
    );

    return res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

export const destroy = async (req, res, next) => {
  // ('/:post_id/comment/:comment_id')
  const user_id = req.user.id;
  const id = req.params.comment_id;
  const { post_id } = req.params;

  try {
    let comment = await Comment.findOne({
      where: { id, post_id, user_id },
    });

    if (!comment) throw createError(404, 'comment not a found');

    await comment.destroy({ where: { id } });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
