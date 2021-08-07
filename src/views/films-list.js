import { createElement } from '../utils.js';

const createFilmsListTemplate = ({ title, isExtra, isTitleVisiallyHidden }) => `
    <section class="films-list ${isExtra ? 'films-list--extra' : ''}">
      <h2 class="films-list__title ${isTitleVisiallyHidden ? 'visually-hidden' : ''}">${title}</h2>
    </section>
  `;

export default class FilmsList {
  constructor(options) {
    this._options = options;

    this._element = null;
  }

  getTemplate() {
    return createFilmsListTemplate(this._options);
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
