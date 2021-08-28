
import { FilterType, UpdateType } from '../const.js';
import { render, replace } from '../utils/render.js';
import { filter } from '../utils/film.js';
import { getRank } from '../utils/profile.js';

import ProfileView from '../views/profile.js';

export default class ProfilePresenter {
  constructor(profileContainer, rankModel, filmsModel) {
    this._profileContainer = profileContainer;
    this._rankModel = rankModel;
    this._filmsModel = filmsModel;

    this._handleFilmsModelEvent = this._handleFilmsModelEvent.bind(this);
    this._handleRankModelEvent = this._handleRankModelEvent.bind(this);

    this._filmsModel.addObserver(this._handleFilmsModelEvent);
    this._rankModel.addObserver(this._handleRankModelEvent);
  }

  init() {
    const prevProfileView = this._profileView;

    this._profileView = new ProfileView(this._rankModel.getRank());

    if (prevProfileView) {
      replace(this._profileView, prevProfileView);
    } else {
      render(this._profileContainer, this._profileView);
    }
  }

  _handleRankModelEvent() {
    this.init();
  }

  _handleFilmsModelEvent(updateType) {
    if (updateType !== UpdateType.PATCH) {
      const films = this._filmsModel.getAll();
      const watchedFilmsAmount = filter[FilterType.HISTORY](films).length;
      const rank = getRank(watchedFilmsAmount);

      if (rank !== this._rankModel.getRank()) {
        this._rankModel.setRank(UpdateType.MAJOR, rank);
      }
    }
  }
}
