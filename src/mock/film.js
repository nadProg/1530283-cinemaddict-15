import dayjs from 'dayjs';
import { getRandomInteger, getRandomBoolean, getUniqueItemsFromArray, getRandomItemFromArray } from '../utils.js';

const DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

const POSTERS = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg',
];

const PEOPLE = [
  'Jimmy Hunt',
  'Dolores Hart',
  'Kathryn Beaumont',
  'Paul Collins',
  'Carol Nugent',
  'Michael Chapin',
  'Sharyn Moffett',
  'Mason Alan Dinehart',
  'William Wellman Jr.',
  'Lisa Davis',
  'Margaret O\'Brien',
  'Billy Gray',
  'Baby Sandy',
  'Eilene Janssen',
];

const TITLES = [
  'High Barbaree',
  'Pitfall',
  'Week-End with Father',
  'East Side of Heaven',
  'It Had to Be You',
  'The Happy Years',
  'The Man from Yesterday',
  'Under California Stars',
  'Journey for Margaret',
  'Love Is Better Than Ever',
  'The Secret Garden',
  'The Green Years',
  'Builds His Dream House',
  'Alice in Wonderland',
  'Peter Pan',
  'Invaders from Mars',
];

const COUNTRIES = [
  'USA',
  'Spain',
  'Canada',
  'France',
  'Poland',
  'Germany',
  'Albanina',
  'United Kingom',
];

const GENRES = [
  'Drama',
  'Comedy',
  'Musical',
  'Western',
  'Cartoon',
  'Mystery',
];

const AGE_RATINGS = [0, 6, 12, 18];

const PHRASES = DESCRIPTION
  .split('. ')
  .map((string, index, array) => index + 1 < array.length ? `${string}.` : string);

const MIN_PHRASE_AMOUNT = 1;
const MAX_PHRASE_AMOUNT = 5;

const MIN_TOTAL_RATING = 1;
const MAX_TOTAL_RATING = 10;

const MIN_GENRES_AMOUNT = 1;
const MAX_GENRES_AMOUNT = 3;

const MIN_RUNTIME = 30;
const MAX_RUNTIME = 120;

const generateDescription = () => {
  const maxAmount = getRandomInteger(MIN_PHRASE_AMOUNT, MAX_PHRASE_AMOUNT);
  return getUniqueItemsFromArray(PHRASES, MIN_PHRASE_AMOUNT, maxAmount).join(' ');
};

const generateAgeRating = () => getRandomItemFromArray(AGE_RATINGS);

const generatePoster = () => getRandomItemFromArray(POSTERS);

const generateTotalRating = () => getRandomInteger(MIN_TOTAL_RATING * 10, MAX_TOTAL_RATING * 10) / 10;

const generateGenres = () => {
  const maxAmount = getRandomBoolean() ? MIN_GENRES_AMOUNT : getRandomInteger(MIN_GENRES_AMOUNT, MAX_GENRES_AMOUNT);
  return getUniqueItemsFromArray(GENRES, maxAmount);
};

const generateCountry = () => getRandomItemFromArray(COUNTRIES);

const generateRuntime = () => getRandomInteger(MIN_RUNTIME, MAX_RUNTIME);

const generateTitle = () => getRandomItemFromArray(TITLES);

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
  const alternativeTitle = getRandomBoolean() ? title : generateTitle();
  const isWatched = getRandomBoolean();
  const watchingDate = isWatched ? generateWatchingDate() : ''; // generate Date with dayjs

  return ({
    id,
    comments: generateComments(),
    filmInfo: {
      title,
      alternativeTitle,
      totalRating: generateTotalRating(),
      poster: generatePoster(),
      ageRating: generateAgeRating(),
      director: 'Tom Ford',  // 1 from PEOPLE
      writers: [
        'Takeshi Kitano',  // 1...3 from PEOPLE
      ],
      actors: [
        'Morgan Freeman',  // 2...5 from PEOPLE
      ],
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
