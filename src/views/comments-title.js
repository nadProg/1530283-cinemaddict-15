
import AbstractView from './abstract.js';

const createCommentsTitleTemplate = (amount) => `
  <h3 class="film-details__comments-title">
    Comments <span class="film-details__comments-count">${amount}</span>
  </h3>
`;

export default class CommentsTitle extends AbstractView {
  constructor(amount) {
    super();

    this._amount = amount;
  }

  getTemplate() {
    return createCommentsTitleTemplate(this._amount);
  }
}
