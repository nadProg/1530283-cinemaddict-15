
import { render, replace } from '../utils/render.js';
import FooterStatisticsView from '../views/footer-statistics.js';

export default class FooterStatisticsPresenter {
  constructor(footerStatisticsContainer) {
    this._footerStatisticsContainer = footerStatisticsContainer;
  }

  init(filmsAmount) {
    const prevFooterStatisticsView = this._footerStatisticsView;

    this._filmsAmount = filmsAmount;

    this._footerStatisticsView = new FooterStatisticsView(this._filmsAmount);

    if (prevFooterStatisticsView) {
      replace(this._footerStatisticsView, prevFooterStatisticsView);
    } else {
      render(this._footerStatisticsContainer, this._footerStatisticsView);
    }
  }
}
