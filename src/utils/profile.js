const rankToUpperLimit = {
  NONE: 0,
  NOVICE: 10,
  FAN: 20,
  MOVIE_BUFF: Infinity,
};

export const getRank = (watchedFilmsAmount) => {
  for (const [rank, upperLimit] of Object.entries(rankToUpperLimit)) {
    if (watchedFilmsAmount <= upperLimit) {
      return rank;
    }
  }
};
