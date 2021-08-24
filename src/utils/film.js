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
  all: (films) => [...films],
  watchlist: (films) => films
    .filter((film) => film.userDetails.isToWatch),
  history: (films) => films
    .filter((film) => film.userDetails.isWatched),
  favorites: (films) => films
    .filter((film) => film.userDetails.isFavorite),
};
