import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const getFullYear = (date) => dayjs(date).format('YYYY');

export const getReleaseDate = (date) => dayjs(date).format('DD MMMM YYYY');

export const getRuntime = (minutesAmount) => dayjs().startOf('day').add(minutesAmount, 'minute').format('H[h] mm[m]');

export const getCommentDate = (date) => dayjs(date).fromNow();

export const getCurrentDate = () => dayjs().toDate();

export const isDateInPeriod = (date, period) => {
  period = period === 'today' ? 'day' : period;

  const limitDate = dayjs().subtract(1, period);
  return dayjs(date).isAfter(limitDate);
};
