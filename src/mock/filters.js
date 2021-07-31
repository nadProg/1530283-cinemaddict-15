const filterNameToCountFilms = {
  all: (films) => films.length,
  watchlist: (films) => films
    .filter((film) => film.userDetails.isToWatch)
    .length,
  history: (films) => films
    .filter((film) => film.userDetails.isWatched)
    .length,
  favorites: (films) => films
    .filter((film) => film.userDetails.isFavorite)
    .length,
};

export const generateFilters = (films) => Object
  .entries(filterNameToCountFilms)
  .map(([filterName, countFilms]) => ({
    name: filterName,
    count: countFilms(films),
  }));

