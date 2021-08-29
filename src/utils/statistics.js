import { getTotalRuntime } from './date.js';

const getGenresStatistics = (watchedFilms) => {
  const genresStatistics = new Map();

  watchedFilms.forEach(({ filmInfo }) => {
    filmInfo.genres.forEach((genre) => {
      const count = genresStatistics.has(genre) ? genresStatistics.get(genre) : 0;
      genresStatistics.set(genre, count + 1);
    });
  });

  const genres = [];
  const counts = [];

  Array.from(genresStatistics.entries())
    .sort(([, countA], [, countB]) => countB - countA)
    .forEach(([genre, count]) => {
      genres.push(genre);
      counts.push(count);
    });

  return genres.length ? { genres, counts } : null;
};

const getTopGenre = ({ genres }) => genres.length ? genres[0] : null;

export const getWatchedStatisticsData = (watchedFilms) => {
  const totalMinutesDuration = watchedFilms.reduce((duration, film) => duration += film.filmInfo.runtime, 0);
  const genresStatistic = getGenresStatistics(watchedFilms);

  return {
    totalAmount: watchedFilms.length,
    totalDuration: getTotalRuntime(totalMinutesDuration),
    genresStatistic: genresStatistic,
    topGenre: genresStatistic && getTopGenre(genresStatistic),
  };
};

export const getStatisticsChartData = (genresStatistics) => ({
  labels: [ ...genresStatistics.genres ],
  datasets: [{
    data: [ ...genresStatistics.counts ],
    backgroundColor: '#ffe800',
    hoverBackgroundColor: '#ffe800',
    anchor: 'start',
    barThickness: 24,
  }],
});

