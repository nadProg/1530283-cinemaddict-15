
import AbstractView from './abstract.js';

const createCommentsContainerTemplate = () => '<section class="film-details__comments-wrap"></section>';

export default class CommentsContainerView extends AbstractView {
  getTemplate() {
    return createCommentsContainerTemplate();
  }
}
