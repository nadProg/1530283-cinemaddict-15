import { createElement } from '../utils.js';

const createFilmDetailsBottomTemplate = () => '<div class="film-details__bottom-container"></div>';

export default class FilmDetailsBottom {
  constructor(film) {
    this._film = film;

    this._element = null;
  }

  getTemplate() {
    return createFilmDetailsBottomTemplate(this._film);
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
