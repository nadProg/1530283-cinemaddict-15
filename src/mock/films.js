import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { generateComment, getCommentsByIds } from './comments.js';
import { getRandomInteger, getRandomBoolean, getUniqueItemsFromArray, getRandomItemFromArray } from '../utils/common.js';
import * as FilmMock from './mock-const.js';

const films = new Map();

const phrases = FilmMock.RAW_DESCRIPTION.split('. ')
  .map((string, index, array) => index + 1 < array.length ? `${string}.` : string);

const generateDescription = () => getUniqueItemsFromArray(phrases, FilmMock.MAX_FILM_PHRASE_AMOUNT).join(' ');

const generateAgeRating = () => getRandomItemFromArray(FilmMock.AGE_RATINGS);

const generatePoster = () => getRandomItemFromArray(FilmMock.POSTERS);

const generateRating = () => getRandomInteger(FilmMock.MIN_RATING * 10, FilmMock.MAX_RATING * 10) / 10;

const generateGenres = () => {
  // с вероятностью 50% будет один жанр
  const maxAmount = getRandomBoolean() ?
    FilmMock.MIN_GENRES_AMOUNT :
    getRandomInteger(FilmMock.MIN_GENRES_AMOUNT, FilmMock.MAX_GENRES_AMOUNT);

  return getUniqueItemsFromArray(FilmMock.GENRES, maxAmount);
};

const generateCountry = () => getRandomItemFromArray(FilmMock.COUNTRIES);

const generateRuntime = () => getRandomInteger(FilmMock.MIN_RUNTIME, FilmMock.MAX_RUNTIME);

const generateTitle = () => getRandomItemFromArray(FilmMock.TITLES);

const generateDirector = () => getRandomItemFromArray(FilmMock.PEOPLE);

const generateWriters = () => getUniqueItemsFromArray(FilmMock.PEOPLE, FilmMock.MAX_WRITERS_AMOUNT);

const generateActors = () => getUniqueItemsFromArray(FilmMock.PEOPLE, FilmMock.MAX_ACTORS_AMOUNT, FilmMock.MIN_ACTORS_AMOUNT);

const generateWatchingDate = () => {
  const watchingDayShift = getRandomInteger(FilmMock.MIN_WATCHING_DAY_SHIFT, FilmMock.MAX_WATCHING_DAY_SHIFT);
  return dayjs().subtract(watchingDayShift, 'day').toDate();
};

const generateReleaseDate = () => {
  const releaseYearShift = getRandomInteger(FilmMock.MIN_RELEASE_YEAR_SHIFT, FilmMock.MAX_RELEASE_YEAR_SHIFT);
  const releaseDaysGap = getRandomInteger(-FilmMock.MAX_RELEASE_DAY_SHIFT, FilmMock.MAX_RELEASE_DAY_SHIFT);
  return dayjs().subtract(releaseYearShift, 'year').add(releaseDaysGap, 'day').toDate();
};

const generateComments = () => {
  // с вероятностью 25% комментарии отсутствуют
  if (getRandomBoolean() && getRandomBoolean()) {
    return [];
  }

  const commentsAmount = getRandomInteger(1, 5);
  const comments = [];

  for (let i = 0; i < commentsAmount; i++) {
    const comment = generateComment();
    comments.push(comment.id);
  }

  return comments;
};

export const generateFilm = () => {
  const title = generateTitle();
  const originalTitle = getRandomBoolean() ? title : generateTitle();
  const isWatched = getRandomBoolean();
  const watchingDate = isWatched ? generateWatchingDate() : '';

  const film = {
    id: nanoid(),
    comments: generateComments(),
    filmInfo: {
      title,
      originalTitle,
      rating: generateRating(),
      poster: generatePoster(),
      ageRating: generateAgeRating(),
      director: generateDirector(),
      writers: generateWriters(),
      actors: generateActors(),
      releaseDate: generateReleaseDate(),
      country: generateCountry(),
      runtime: generateRuntime(),
      genres: generateGenres(),
      description: generateDescription(),
    },
    userDetails: {
      watchingDate,
      isWatched,
      isFavorite: getRandomBoolean(),
      isToWatch: getRandomBoolean(),
    },
  };

  films.set(film.id, film);

  return film;
};

const getAllFilms = () => Array.from(films.values());

const getFilmComments = (id) => getCommentsByIds(films.get(id).comments);

const updateFilm = (id, updatedFilm) => {
  films.set(id, updatedFilm);
  return films.get(id);
};

const generateFilms = () => {
  // С вероятностью 25% фильмы отсутствуют
  const filmsAmount = getRandomBoolean() && getRandomBoolean() ?
    0 : getRandomInteger(FilmMock.MIN_FILMS_AMOUNT, FilmMock.MAX_FILMS_AMOUNT);

  for (let i = 0; i < filmsAmount; i++) {
    const film = generateFilm();
    films.set(film.id, film);
  }
};

generateFilms();

export { getAllFilms, getFilmComments };
