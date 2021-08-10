import { ESCAPE_CODE } from '../const.js';

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
