import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { Emotion } from '../const.js';
import * as CommentMock from './mock-const.js';
import { getRandomItemFromArray, getRandomInteger } from '../utils/common.js';
import { updateFilm } from './films.js';

const comments = new Map();

const generateAuthor = () => getRandomItemFromArray(CommentMock.PEOPLE);

const generateEmotion = () => getRandomItemFromArray(Object.values(Emotion));

const generateText = () => getRandomItemFromArray(CommentMock.COMMENT_PHRASES);

const generateCommentDate = () => {
  const commentDayShift = getRandomInteger(
    CommentMock.MIN_COMMENT_DAY_SHIFT,
    CommentMock.MAX_COMMENT_DAY_SHIFT,
  );

  const commentMinuteShift = getRandomInteger(
    CommentMock.MIN_COMMENT_MINUTE_SHIFT,
    CommentMock.MAX_COMMENT_MINUTE_SHIFT,
  );

  return dayjs().subtract(commentDayShift, 'day').subtract(commentMinuteShift, 'minute').toDate();
};

const generateComment = () => {
  const comment = {
    id: nanoid(),
    text: generateText(),
    author: generateAuthor(),
    emotion: generateEmotion(),
    date: generateCommentDate(),
  };

  comments.set(comment.id, comment);

  return comment;
};

const getCommentById = (id) => comments.get(id);

const getCommentsByIds = (ids) => ids.map((id) => getCommentById(id));

const createComment = (film, payload) => {
  const newComment = {
    ...payload,
    id: nanoid(),
    date: new Date(),
  };

  const updatedFilm = {
    ...film,
    comments: film.comments.push(newComment.id),
  };

  comments.set(newComment.id, newComment);
  updateFilm(updatedFilm.id, updatedFilm);

  return updatedFilm;
};

const deleteComment = (film, commentId) => {
  const updatedFilm = {
    ...film,
    comments: film.comments.filter((id) => id !== commentId),
  };

  comments.delete(commentId);
  updateFilm(updatedFilm.id, updatedFilm);

  return updatedFilm;
};

export { generateComment, getCommentsByIds, createComment, deleteComment };
