import { remove, render } from '../utils/render.js';
import StatisticView from '../views/statistic.js';

export default class StatisticScreen {
  constructor(statisticContainer) {
    this._statisticContainer = statisticContainer;
  }

  init() {
    this._statiscticView = new StatisticView();
    render(this._statisticContainer, this._statiscticView);
  }

  destroy() {
    if (this._statiscticView) {
      remove(this._statiscticView);
      this._statiscticView = null;
    }
  }
}
