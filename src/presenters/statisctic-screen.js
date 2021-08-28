import { remove, render } from '../utils/render.js';
import { filter } from '../utils/film.js';
import { getWatchedStatisticData } from '../utils/statistic.js';
import { FilterType } from '../const.js';
import StatisticView from '../views/statistic.js';

export default class StatisticScreen {
  constructor(statisticContainer, rankModel, filmsModel) {
    this._statisticContainer = statisticContainer;
    this._rankModel = rankModel;
    this._filmsModel = filmsModel;
  }

  init() {
    const watchedFilms = filter[FilterType.HISTORY](this._filmsModel.getAll());

    this._statiscticView = new StatisticView();
    this._statiscticView.updateData({
      rank: this._rankModel.getRank(),
      ...getWatchedStatisticData(watchedFilms),
    });

    render(this._statisticContainer, this._statiscticView);
  }

  destroy() {
    if (this._statiscticView) {
      remove(this._statiscticView);
      this._statiscticView = null;
    }
  }
}
