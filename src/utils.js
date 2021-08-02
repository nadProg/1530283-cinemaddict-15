
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Place } from './const';

dayjs.extend(relativeTime);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const renderAfterEnd = (container, template) => render(container, template, Place.AFTER_END);

export const renderBeforeEnd = (container, template) => render(container, template, Place.BEFORE_END);

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomBoolean = () => !!getRandomInteger();

export const getRandomItemFromArray = (items) => {
  const index = getRandomInteger(0, items.length - 1);
  return items[index];
};

export const getUniqueItemsFromArray = (items, maxUniqueAmount, minUniqueAmount = 1) => {
  const uniqueAmount = getRandomInteger(minUniqueAmount, maxUniqueAmount);
  const itemsSet = new Set();
  while (itemsSet.size < uniqueAmount) {
    itemsSet.add(getRandomItemFromArray(items));
  }
  return Array.from(itemsSet);
};

export const getFullYear = (date) => dayjs(date).format('YYYY');

export const getReleaseDate = (date) => dayjs(date).format('DD MMMM YYYY');

export const getRuntime = (minutesAmount) => dayjs().startOf('day').add(minutesAmount, 'minute').format('H[h] mm[m]');

export const getCommentDate = (date) => dayjs(date).fromNow();

export const formatRating = (rating) => rating.toFixed(1);

export const formatItems = (items) => items.join(', ');
