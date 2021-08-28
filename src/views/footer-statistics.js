import AbstractView from './abstract.js';

export const createFooterStatisticsTemplate = (totalFilmsAmount) => `
  <section class="footer__statistics">
    <p>${totalFilmsAmount} movies inside</p>
  </section>
`;

export default class FooterStatisticsView extends AbstractView {
  constructor(totalFilmsAmount) {
    super();

    this._totalFilmsAmount = totalFilmsAmount;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._totalFilmsAmount);
  }
}
