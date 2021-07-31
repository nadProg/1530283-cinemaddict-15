import dayjs from 'dayjs';
import { getRandomItemFromArray } from '../utils.js';
import { PEOPLE } from './film-const.js';

const EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];

const PHRASES = [
  'Interesting setting and a good cast',
  'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
  'Booooooooooring',
  'Very very old. Meh',
  'Almost two hours? Seriously?',
];

const generateAuthor = () => getRandomItemFromArray(PEOPLE);

const generateEmotion = () => getRandomItemFromArray(EMOTIONS);

const generateText = () => getRandomItemFromArray(PHRASES);

const generateCommentDate = () => dayjs().toDate(); /// !!!

export const generateComment = (id) => ({
  id,
  author: generateAuthor(),
  text: generateText(),
  date: generateCommentDate(),
  emotion: generateEmotion(),
});

export const getCommentsFromIds = (allComments, ids) => allComments.filter(({ id }) => ids.includes(id));
