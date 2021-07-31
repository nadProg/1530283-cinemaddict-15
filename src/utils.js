
import dayjs from 'dayjs';

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
  const amount = getRandomInteger(minUniqueAmount, maxUniqueAmount);
  const nonUniqueItems = new Array(amount).fill().map(() => getRandomItemFromArray(items));
  return Array.from(new Set(nonUniqueItems));
};

export const getYear = (date) => dayjs(date).format('YYYY');

export const getRuntime = (minutesAmount) => dayjs().hour(0).minute(0).add(minutesAmount, 'minute').format('H[h] mm[m]');
