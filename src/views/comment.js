
import he from 'he';
import AbstractView from './abstract.js';
import { getCommentDate } from '../utils/date.js';

const createCommentTemplate = (comment) => {
  const { author, date, emotion, text, id } = comment;

  return `
    <li class="film-details__comment" data-comment-id=${id}>
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${he.encode(text)}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${getCommentDate(date)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>
  `;
};

export default class CommentView extends AbstractView {
  constructor(comment) {
    super();

    this._comment = comment;

    this._deleteButtonClickHandler = this._deleteButtonClickHandler.bind(this);
  }

  getTemplate() {
    return createCommentTemplate(this._comment);
  }

  _deleteButtonClickHandler(evt) {
    evt.preventDefault();
    const commentItem = evt.target.closest('[data-comment-id]');

    this._callback._deleteButtonClick(commentItem.dataset.commentId);
  }

  setDeleteButtonClickHandler(callback) {
    this._callback._deleteButtonClick = callback;
    this.getElement()
      .querySelector('.film-details__comment-delete')
      .addEventListener('click', this._deleteButtonClickHandler);
  }
}
