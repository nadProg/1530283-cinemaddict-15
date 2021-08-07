
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Place, ESCAPE_CODE } from './const.js';

dayjs.extend(relativeTime);


export const render = (container, element, place) => {
  switch (place) {
    case Place.BEFORE_END:
      container.append(element);
      break;
    case Place.AFTER_BEGIN:
      container.prepend(element);
      break;
  }
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

export const isEsc = ({ code }) => code === ESCAPE_CODE;

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
