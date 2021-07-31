import dayjs from 'dayjs';
import { getRandomInteger, getRandomBoolean, getUniqueItemsFromArray, getRandomItemFromArray } from '../utils.js';
import * as FilmConst from './film-const.js';

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

const phrases = FilmConst.RAW_DESCRIPTION.split('. ')
  .map((string, index, array) => index + 1 < array.length ? `${string}.` : string);

const generateDescription = () => getUniqueItemsFromArray(phrases, MAX_PHRASE_AMOUNT).join(' ');

const generateAgeRating = () => getRandomItemFromArray(FilmConst.AGE_RATINGS);

const generatePoster = () => getRandomItemFromArray(FilmConst.POSTERS);

const generateTotalRating = () => getRandomInteger(MIN_TOTAL_RATING * 10, MAX_TOTAL_RATING * 10) / 10;

const generateGenres = () => {
  // с вероятностью 50% будет один жанр
  const maxAmount = getRandomBoolean() ? MIN_GENRES_AMOUNT : getRandomInteger(MIN_GENRES_AMOUNT, MAX_GENRES_AMOUNT);
  return getUniqueItemsFromArray(FilmConst.GENRES, maxAmount);
};

const generateCountry = () => getRandomItemFromArray(FilmConst.COUNTRIES);

const generateRuntime = () => getRandomInteger(MIN_RUNTIME, MAX_RUNTIME);

const generateTitle = () => getRandomItemFromArray(FilmConst.TITLES);

const generateDirector = () => getRandomItemFromArray(FilmConst.PEOPLE);

const generateWriters = () => getUniqueItemsFromArray(FilmConst.PEOPLE, MAX_WRITERS_AMOUNT);

const generateActors = () => getUniqueItemsFromArray(FilmConst.PEOPLE, MAX_ACTORS_AMOUNT, MIN_ACTORS_AMOUNT);

const generateWatchingDate = () => {
  const minAfterWatchingDaysAmount = 5;
  const maxAfterWatchingDaysAmount = 60;
  const afterWatchingDaysAmount = getRandomInteger(minAfterWatchingDaysAmount, maxAfterWatchingDaysAmount);

  return dayjs().subtract(afterWatchingDaysAmount, 'day').toDate();
};

const generateReleaseDate = () => {
  const minAfterReleaseYearsAmount = 40;
  const maxAfterReleaseYearsAmount = 80;
  const afterReleaseYearsAmount = getRandomInteger(minAfterReleaseYearsAmount, maxAfterReleaseYearsAmount);

  const maxDaysGap = 180;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().subtract(afterReleaseYearsAmount, 'year').add(daysGap, 'days').toDate();
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
      totalRating: generateTotalRating(),
      poster: generatePoster(),
      ageRating: generateAgeRating(),
      director: generateDirector(),
      writers: generateWriters(),
      actors: generateActors(),
      release: {
        date: generateReleaseDate(),
        releaseCountry: generateCountry(),
      },
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
