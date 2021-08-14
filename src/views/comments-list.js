
import AbstractView from './abstract.js';

const createCommentsListTemplate = () => '<ul class="film-details__comments-list"></ul>';

export default class CommentsListView extends AbstractView {
  getTemplate() {
    return createCommentsListTemplate();
  }
}
