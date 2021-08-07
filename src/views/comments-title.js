
import { createElement } from '../utils.js';

const createCommentsWrapTemplate = (amount) => `
  <h3 class="film-details__comments-title">
    Comments <span class="film-details__comments-count">${amount}</span>
  </h3>
`;

export default class CommentsTitle {
  constructor(amount) {
    this._amount = amount;

    this._element = null;
  }

  getTemplate() {
    return createCommentsWrapTemplate(this._amount);
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
