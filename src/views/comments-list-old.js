import { createElement } from '../utils.js';
import { getCommentDate } from '../utils.js';

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

export const createCommentsListTemplate = (comments) => {
  const commentsTemplate = comments.map((comment) => createCommentTemplate(comment)).join('');
  return `
    <h3 class="film-details__comments-title">
      Comments <span class="film-details__comments-count">${comments.length}</span>
    </h3>
    <ul class="film-details__comments-list">
    ${commentsTemplate}
    </ul>
  `;
};

export default class CommentsList {
  constructor(film) {
    this._film = film;

    this._element = null;
  }

  getTemplate() {
    return createCommentsListTemplate(this._film);
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
