import { createElement } from '../utils.js';

export const createFooterStatisticTemplate = (totalFilmsAmount) => `
  <section class="footer__statistics">
    <p>${totalFilmsAmount} movies inside</p>
  </section>
`;

export default class FooterStatistic {
  constructor(totalFilmsAmount) {
    this._totalFilmsAmount = totalFilmsAmount;

    this._element = null;
  }

  getTemplate() {
    return createFooterStatisticTemplate(this._totalFilmsAmount);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
