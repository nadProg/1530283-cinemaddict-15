
import AbstractView from './abstract.js';

const createCommentsContainerTemplate = () => '<section class="film-details__comments-wrap"></section>';

export default class CommentsContainer extends AbstractView {
  getTemplate() {
    return createCommentsContainerTemplate();
  }
}
