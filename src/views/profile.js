import { RANKS, RankTextContent, RankUpperLimit } from '../const.js';

const getProfileRank = (watchedFilmsAmount) => {
  for (const userRank of RANKS) {
    if (watchedFilmsAmount <= RankUpperLimit[userRank]) {
      return RankTextContent[userRank];
    }
  }
};

export const createProfileTemplate = (watchedFilmsAmount) => `
  <section class="header__profile profile">
    ${watchedFilmsAmount ? `<p class="profile__rating">${getProfileRank(watchedFilmsAmount)}</p>` : ''}
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>
`;
