import { isDateInPeriod } from './date.js';
import { MAX_DESCRIPTION_LENGTH, StatisticsPeriodValue } from '../const.js';

export const trimDescription = (description) => description.length <= MAX_DESCRIPTION_LENGTH ?
  description : `${description.slice(0, MAX_DESCRIPTION_LENGTH - 1)}...`;

export const formatRating = (rating) => rating.toFixed(1);

export const formatItems = (items) => items.join(', ');

export const sortByRating = (filmA, filmB) => filmB.filmInfo.rating - filmA.filmInfo.rating;

export const sortByComments = (filmA, filmB) => filmB.comments.length - filmA.comments.length;

export const sortByDate = (filmA, filmB) => filmB.filmInfo.releaseDate - filmA.filmInfo.releaseDate;

export const getTopRatedFilms = (films) => [...films].sort((a, b) => b.filmInfo.rating - a.filmInfo.rating);

export const getMostCommentedFilms = (films) => [...films].sort((a, b) => b.comments.length - a.comments.length);

export const hasComments = (film) => film.comments.length > 0;

export const hasRating = (film) => film.filmInfo.rating > 0;

export const filter = {
  ALL: (films) => [...films],
  WATCHLIST: (films) => films
    .filter((film) => film.userDetails.isToWatch),
  HISTORY: (films) => films
    .filter((film) => film.userDetails.isWatched),
  FAVORITES: (films) => films
    .filter((film) => film.userDetails.isFavorite),
};

export const isFilmInWhatcingPeriod = (film, period) => {
  if (period === StatisticsPeriodValue.ALL) {
    return true;
  }

  const { watchingDate } = film.userDetails;

  return isDateInPeriod(watchingDate, period);
};

export const adaptFilmToClient = (film) => {
  const clientFilm = { ... film};

  clientFilm.filmInfo = {
    ...film['film_info'],
    originalTitle: film['film_info']['alternative_title'],
    genres: [ ...film['film_info'].genre ],
    ageRating: film['film_info']['age_rating'],
    releaseDate: new Date(film['film_info'].release.date),
    country: film['film_info'].release['release_country'],
    rating: film['film_info']['total_rating'],
    poster: film['film_info'].poster.split('images/posters/')[1],
  };

  clientFilm.userDetails = {
    isToWatch: film['watchlist'],
    isFavorite: film['favorite'],
    isWatched: film['already_watched'],
    watchingDate: film['watching_date'] ? new Date(film['watching_date']) : null,
  };

  delete clientFilm['film_info'];

  delete clientFilm.filmInfo['alternative_title'];
  delete clientFilm.filmInfo['age_rating'];
  delete clientFilm.filmInfo['total_rating'];
  delete clientFilm.filmInfo.release;
  delete clientFilm.filmInfo.genre;

  delete clientFilm['user_details'];

  return clientFilm;
};

export const adaptCommentToClient = (comment) => {
  const clientComment = { ...comment };

  clientComment.text = comment.comment;
  clientComment.date = new Date(comment.date);

  delete clientComment.comment;

  return clientComment;
};
