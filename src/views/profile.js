import AbstractView from './abstract.js';
import { RANKS } from '../const.js';

const rankToTextContent = {
  none: '',
  novice: 'Novice',
  fan: 'Fan',
  movieBuff: 'Movie Buff',
};

const rankToUpperLimit = {
  none: 0,
  novice: 10,
  fan: 20,
  movieBuff: Infinity,
};

const getProfileRank = (watchedFilmsAmount) => {
  for (const userRank of RANKS) {
    if (watchedFilmsAmount <= rankToUpperLimit[userRank]) {
      return rankToTextContent[userRank];
    }
  }
};

const createProfileTemplate = (watchedFilmsAmount) => `
  <section class="header__profile profile">
    ${watchedFilmsAmount ? `<p class="profile__rating">${getProfileRank(watchedFilmsAmount)}</p>` : ''}
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>
`;

export default class Profile extends AbstractView {
  constructor(watchedFilmsAmount) {
    super();

    this._watchedFilmsAmount = watchedFilmsAmount;
  }

  getTemplate() {
    return createProfileTemplate(this._watchedFilmsAmount);
  }
}
