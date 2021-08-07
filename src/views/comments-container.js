
import { createElement } from '../utils.js';

const createCommentsContainerTemplate = () => '<section class="film-details__comments-wrap"></section>';

export default class CommentsWrap {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createCommentsContainerTemplate();
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
