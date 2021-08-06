
import { createElement } from '../utils.js';

const createCommentsWrapTemplate = () => '<section class="film-details__comments-wrap"></section>';

export default class CommentsWrap {
  constructor(film) {
    this._film = film;

    this._element = null;
  }

  getTemplate() {
    return createCommentsWrapTemplate(this._film);
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
