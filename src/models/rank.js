import { Rank } from '../const.js';

import AbstractObserver from '../utils/abstract-observer.js';

export default class RankModel extends AbstractObserver {
  constructor(rank = Rank.NONE) {
    super();
    this._rank = rank;
  }

  setRank(updateType, rank) {
    this._rank = rank;
    this._notify(updateType, rank);
  }

  getRank() {
    return this._rank;
  }
}
