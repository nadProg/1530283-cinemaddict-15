import dayjs from 'dayjs';
import { EMOTIONS } from '../const.js';
import * as CommentMock from './mock-const.js';
import { getRandomItemFromArray, getRandomInteger, getRandomBoolean } from '../utils/common.js';

const generateAuthor = () => getRandomItemFromArray(CommentMock.PEOPLE);

const generateEmotion = () => getRandomItemFromArray(EMOTIONS);

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

export const generateComment = (id) => ({
  id,
  text: generateText(),
  author: generateAuthor(),
  emotion: generateEmotion(),
  date: generateCommentDate(),
});

const generateComments = () => {
  const amount = CommentMock.COMMENTS_AMOUNT;
  return new Array(amount).fill().map((item, index) => generateComment(index + 1));
};

export const generateNewComment = () => {
  // Новый комментарий имеет текст и эмодзи с 50% вероятностью
  const text = getRandomBoolean() ? generateText() : '';
  const emotion = getRandomBoolean() ? generateEmotion() : '';

  return { text, emotion };
};

export const mockComments = generateComments();

const getCommentById = (comments, id) => comments.find((comment) => comment.id === id);

export const getCommentsByIds = (comments, ids) => ids.map((id) => getCommentById(comments, id));
