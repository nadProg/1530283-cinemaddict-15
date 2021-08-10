import AbstractView from './abstract.js';
import { MAX_DESCRIPTION_LENGTH, ClassName } from '../const.js';
import { getFullYear, getRuntime, formatRating } from '../utils.js';

const setActiveClassName = (condition) => condition ? ClassName.FILM_CARD_CONTROL_ACTIVE : '';

const trimDescription = (description) => description.length <= MAX_DESCRIPTION_LENGTH ?
  description : `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`;

export const createFilmCardTemplate = (film) => {
  const { comments, filmInfo, userDetails, id } = film;
  const { title, rating, description, genres, poster, releaseDate, runtime } = filmInfo;
  const { isWatched, isFavorite, isToWatch } = userDetails;
  const mainGenre = genres[0];

  return `
    <article class="film-card" data-film-id=${id}>
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${formatRating(rating)}</p>
      <p class="film-card__info">
        <span class="film-card__year">${getFullYear(releaseDate)}</span>
        <span class="film-card__duration">${getRuntime(runtime)}</span>
        <span class="film-card__genre">${mainGenre}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${trimDescription(description)}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${setActiveClassName(isToWatch)}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${setActiveClassName(isWatched)}" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite ${setActiveClassName(isFavorite)}" type="button">Mark as favorite</button>
      </div>
    </article>
  `;
};

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();

    this._film = film;
    this._titleClickHandler = this._titleClickHandler.bind(this);
    this._posterClickHandler = this._posterClickHandler.bind(this);
    this._commentsClickHandler = this._commentsClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _titleClickHandler(evt) {
    evt.preventDefault();
    this._callback.titleClick();
  }

  _posterClickHandler(evt) {
    evt.preventDefault();
    this._callback.posterClick();
  }

  _commentsClickHandler(evt) {
    evt.preventDefault();
    this._callback.commentsClick();
  }

  setTitleClickHandler(callback) {
    this._callback.titleClick = callback;
    this.getElement().querySelector(`.${ClassName.FILM_CARD_TITLE}`)
      .addEventListener('click', this._titleClickHandler);
  }

  setPosterClickHandler(callback) {
    this._callback.posterClick = callback;
    this.getElement().querySelector(`.${ClassName.FILM_CARD_POSTER}`)
      .addEventListener('click', this._posterClickHandler);
  }

  setCommentsClickHandler(callback) {
    this._callback.commentsClick = callback;
    this.getElement().querySelector(`.${ClassName.FILM_CARD_COMMENTS}`)
      .addEventListener('click', this._commentsClickHandler);
  }
}
