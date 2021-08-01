import dayjs from 'dayjs';
import { getRandomInteger, getRandomBoolean, getUniqueItemsFromArray, getRandomItemFromArray } from '../utils.js';
import * as FilmMock from './mock-const.js';

const MAX_PHRASE_AMOUNT = 5;

const MIN_TOTAL_RATING = 1;
const MAX_TOTAL_RATING = 10;

const MIN_GENRES_AMOUNT = 1;
const MAX_GENRES_AMOUNT = 3;

const MIN_RUNTIME = 30;
const MAX_RUNTIME = 160;

const MAX_WRITERS_AMOUNT = 3;

const MIN_ACTORS_AMOUNT = 3;
const MAX_ACTORS_AMOUNT = 6;

const MIN_WATCHING_DAY_SHIFT = 5;
const MAX_WATCHING_DAY_SHIFT = 60;

const MIN_RELEASE_YEAR_SHIFT = 40;
const MAX_RELEASE_YEAR_SHIFT = 80;
const MAX_RELEASE_DAY_SHIFT = 180;

const phrases = FilmMock.RAW_DESCRIPTION.split('. ')
  .map((string, index, array) => index + 1 < array.length ? `${string}.` : string);

const generateDescription = () => getUniqueItemsFromArray(phrases, MAX_PHRASE_AMOUNT).join(' ');

const generateAgeRating = () => getRandomItemFromArray(FilmMock.AGE_RATINGS);

const generatePoster = () => getRandomItemFromArray(FilmMock.POSTERS);

const generateRating = () => getRandomInteger(MIN_TOTAL_RATING * 10, MAX_TOTAL_RATING * 10) / 10;

const generateGenres = () => {
  // с вероятностью 50% будет один жанр
  const maxAmount = getRandomBoolean() ? MIN_GENRES_AMOUNT : getRandomInteger(MIN_GENRES_AMOUNT, MAX_GENRES_AMOUNT);
  return getUniqueItemsFromArray(FilmMock.GENRES, maxAmount);
};

const generateCountry = () => getRandomItemFromArray(FilmMock.COUNTRIES);

const generateRuntime = () => getRandomInteger(MIN_RUNTIME, MAX_RUNTIME);

const generateTitle = () => getRandomItemFromArray(FilmMock.TITLES);

const generateDirector = () => getRandomItemFromArray(FilmMock.PEOPLE);

const generateWriters = () => getUniqueItemsFromArray(FilmMock.PEOPLE, MAX_WRITERS_AMOUNT);

const generateActors = () => getUniqueItemsFromArray(FilmMock.PEOPLE, MAX_ACTORS_AMOUNT, MIN_ACTORS_AMOUNT);

const generateWatchingDate = () => {
  const watchingDayShift = getRandomInteger(MIN_WATCHING_DAY_SHIFT, MAX_WATCHING_DAY_SHIFT);
  return dayjs().subtract(watchingDayShift, 'day').toDate();
};

const generateReleaseDate = () => {
  const releaseYearShift = getRandomInteger(MIN_RELEASE_YEAR_SHIFT, MAX_RELEASE_YEAR_SHIFT);
  const releaseDaysGap = getRandomInteger(-MAX_RELEASE_DAY_SHIFT, MAX_RELEASE_DAY_SHIFT);
  return dayjs().subtract(releaseYearShift, 'year').add(releaseDaysGap, 'day').toDate();
};

const generateComments = () => {
  // с вероятностью 25% комментарии отсутствуют
  if (getRandomBoolean() && getRandomBoolean()) {
    return [];
  }

  const maxAmount = getRandomInteger(1, 5);
  const nonUniqueComments = new Array(maxAmount).fill().map(() => getRandomInteger(1, 100));
  return Array.from(new Set(nonUniqueComments));
};

export const generateFilm = (id) => {
  const title = generateTitle();
  const originalTitle = getRandomBoolean() ? title : generateTitle();
  const isWatched = getRandomBoolean();
  const watchingDate = isWatched ? generateWatchingDate() : '';

  return ({
    id,
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
  });
};

export const getTopRatedFilms = (films) => [...films].sort((a, b) => b.filmInfo.rating - a.filmInfo.rating);

export const getMostCommentedFilms = (films) => [...films].sort((a, b) => b.comments.length - a.comments.length);
