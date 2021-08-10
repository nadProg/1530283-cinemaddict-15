
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
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${getCommentDate(date)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>
  `;
};

export default class Comment extends AbstractView {
  constructor(comment) {
    super();

    this._comment = comment;
  }

  getTemplate() {
    return createCommentTemplate(this._comment);
  }
}
