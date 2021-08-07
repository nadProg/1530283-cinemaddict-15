import { createElement } from '../utils.js';

const createFilmsListTemplate = ({title, isExtra, isTitleVisiallyHidden }) => `
    <section class="films-list ${isExtra ? 'films-list--extra' : ''}">
      <h2 class="films-list__title ${isTitleVisiallyHidden ? 'visually-hidden' : ''}">${title}</h2>
    </section>
  `;

export default class FilmsList {
  constructor(title, type) {
    this._title = title;
    this._type = type;

    this._element = null;
  }

  getTemplate() {
    return createFilmsListTemplate(this._title, this._type);
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
