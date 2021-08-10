import AbstractView from './abstract.js';

export const createFooterStatisticTemplate = (totalFilmsAmount) => `
  <section class="footer__statistics">
    <p>${totalFilmsAmount} movies inside</p>
  </section>
`;

export default class FooterStatistic extends AbstractView {
  constructor(totalFilmsAmount) {
    super();

    this._totalFilmsAmount = totalFilmsAmount;
  }

  getTemplate() {
    return createFooterStatisticTemplate(this._totalFilmsAmount);
  }
}
