import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const getFullYear = (date) => dayjs(date).format('YYYY');

export const getReleaseDate = (date) => dayjs(date).format('DD MMMM YYYY');

export const getRuntime = (minutesAmount) => dayjs().startOf('day').add(minutesAmount, 'minute').format('H[h] mm[m]');

export const getTotalRuntime = (totalMinutesAmount) => {
  const referenceDate = dayjs().startOf('day');
  const date = referenceDate.add(totalMinutesAmount, 'minute');
  const hoursAmount = date.diff(referenceDate, 'hour');
  const minutesAmount = date.subtract(hoursAmount, 'hour').diff(referenceDate, 'minute');
  return { hour: hoursAmount, minute: minutesAmount };
};

export const getCommentDate = (date) => dayjs(date).fromNow();

export const getCurrentDate = () => dayjs().toDate();

export const isDateInPeriod = (date, period) => {
  const limitDate = dayjs().subtract(1, period);
  return dayjs(date).isAfter(limitDate);
};
