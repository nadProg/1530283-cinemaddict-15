import { createElement } from '../utils.js';

export const createFooterStatisticTemplate = (amount) => `
  <section class="footer__statistics">
    <p>${amount} movies inside</p>
  </section>
`;

export default class FooterStatistic {
  constructor(amount) {
    this._amount = amount;

    this._element = null;
  }

  getTemplate() {
    return createFooterStatisticTemplate(this._amount);
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
