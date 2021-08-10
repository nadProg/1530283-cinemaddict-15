
import AbstractView from './abstract.js';

const createCommentsListTemplate = () => '<ul class="film-details__comments-list"></ul>';

export default class CommentsList extends AbstractView {
  getTemplate() {
    return createCommentsListTemplate();
  }
}
