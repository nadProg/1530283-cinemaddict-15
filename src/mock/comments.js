import dayjs from 'dayjs';
import { EMOTIONS } from '../const.js';
import { PEOPLE, COMMENT_PHRASES } from './mock-const.js';
import { getRandomItemFromArray, getRandomInteger, getRandomBoolean } from '../utils.js';

const MIN_COMMENT_DAY_SHIFT = 0;
const MAX_COMMENT_DAY_SHIFT = 180;
const MIN_COMMENT_MINUTE_SHIFT = 0;
const MAX_COMMENT_MINUTE_SHIFT = 700;

const generateAuthor = () => getRandomItemFromArray(PEOPLE);

const generateEmotion = () => getRandomItemFromArray(EMOTIONS);

const generateText = () => getRandomItemFromArray(COMMENT_PHRASES);

const generateCommentDate = () => {
  const commentDayShift = getRandomInteger(MIN_COMMENT_DAY_SHIFT, MAX_COMMENT_DAY_SHIFT);
  const commentMinuteShift = getRandomInteger(MIN_COMMENT_MINUTE_SHIFT, MAX_COMMENT_MINUTE_SHIFT);
  return dayjs().subtract(commentDayShift, 'day').subtract(commentMinuteShift, 'minute').toDate();
};

export const generateComment = (id) => ({
  id,
  text: generateText(),
  author: generateAuthor(),
  emotion: generateEmotion(),
  date: generateCommentDate(),
});

export const generateComments = (amount) => new Array(amount).fill().map((item, index) => generateComment(index + 1));

export const generateNewComment = () => {
  // Новый комментарий имеет текст и эмодзи с 50% вероятностью
  const text = getRandomBoolean() ? generateText() : '';
  const emotion = getRandomBoolean() ? generateEmotion() : '';

  return { text, emotion };
};

const getCommentById = (comments, id) => comments.find((comment) => comment.id === id);

export const getCommentsByIds = (comments, ids) => ids.map((id) => getCommentById(comments, id));
