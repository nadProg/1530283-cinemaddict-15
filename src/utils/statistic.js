const getGenresStatistic = (watchedFilms) => {
  const genresStatistic = new Map();

  watchedFilms.forEach(({ filmInfo }) => {
    filmInfo.genres.forEach((genre) => {
      const count = genresStatistic.has(genre) ? genresStatistic.get(genre) : 1;
      genresStatistic.set(genre, count + 1);
    });
  });

  const genres = [];
  const counts = [];

  Array.from(genresStatistic.entries())
    .sort((a, b) => b[1] - a[1])
    .forEach(([genre, count]) => {
      genres.push(genre);
      counts.push(count);
    });

  return { genres, counts };
};

const getTopGenre = ({ genres }) => genres.length ? genres[0] : null;

const getTotalDuration = (totalMinutesDuration) => {
  const MINUTES_IN_HOUR = 60;

  const hour = Math.floor(totalMinutesDuration / 60);
  const minute = totalMinutesDuration - hour * MINUTES_IN_HOUR;

  return { hour, minute };
};

export const getWatchedStatisticData = (watchedFilms) => {
  const totalMinutesDuration = watchedFilms.reduce((duration, film) => duration += film.filmInfo.runtime, 0);
  const genresStatistic = getGenresStatistic(watchedFilms);

  return {
    totalAmount: watchedFilms.length,
    totalDuration: getTotalDuration(totalMinutesDuration),
    genresStatistic: genresStatistic,
    topGenre: getTopGenre(genresStatistic),
  };
};

export const isFilmInWatchedPeriod = (film, period) => {

};
