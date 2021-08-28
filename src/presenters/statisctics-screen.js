import { FilterType, StatisticsPeriodValue } from '../const.js';
import { remove, render } from '../utils/render.js';
import { filter, isFilmInWhatcingPeriod } from '../utils/film.js';
import { getWatchedStatisticsData } from '../utils/statistics.js';

import StatisticsView from '../views/statistics.js';

export default class StatisticsScreen {
  constructor(statisticContainer, rankModel, filmsModel) {
    this._statisticContainer = statisticContainer;
    this._rankModel = rankModel;
    this._filmsModel = filmsModel;

    this._handlePeriodChange = this._handlePeriodChange.bind(this);
  }

  init() {
    this._watchedFilms = filter[FilterType.HISTORY](this._filmsModel.getAll());

    this._statiscticsView = new StatisticsView();
    this._statiscticsView.setPeriodChangeHandler(this._handlePeriodChange);
    this._statiscticsView.updateData({
      rank: this._rankModel.getRank(),
    });
    this._handlePeriodChange(StatisticsPeriodValue.ALL);

    render(this._statisticContainer, this._statiscticsView);
  }

  destroy() {
    if (this._statiscticsView) {
      remove(this._statiscticsView);
      this._statiscticsView = null;
    }
  }

  _handlePeriodChange(activePeriodValue) {
    const watchedFilms = [...this._watchedFilms].filter((film) => isFilmInWhatcingPeriod(film, activePeriodValue));

    this._statiscticsView.updateData({
      activePeriodValue,
      ...getWatchedStatisticsData(watchedFilms),
    });
  }
}
