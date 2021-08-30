import { ClassName } from '../const.js';
import { getFullYear, getRuntime } from '../utils/date.js';
import { formatRating, trimDescription } from '../utils/film.js';

import AbstractView from './abstract.js';

const setActiveClassName = (condition) => condition ? ClassName.FILM_CARD_CONTROL_ACTIVE : '';

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
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${setActiveClassName(isToWatch)}" type="button">
          Add to watchlist
        </button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${setActiveClassName(isWatched)}" type="button">
          Mark as watched
        </button>
        <button class="film-card__controls-item film-card__controls-item--favorite ${setActiveClassName(isFavorite)}" type="button">
          Mark as favorite
        </button>
      </div>
    </article>
  `;
};

export default class FilmCardView extends AbstractView {
  constructor(film) {
    super();

    this._film = film;
    this._titleClickHandler = this._titleClickHandler.bind(this);
    this._posterClickHandler = this._posterClickHandler.bind(this);
    this._commentsClickHandler = this._commentsClickHandler.bind(this);

    this._addToWatchButtonClickHandler = this._addToWatchButtonClickHandler.bind(this);
    this._addWatchedButtonClickHandler = this._addWatchedButtonClickHandler.bind(this);
    this._addFavoriteButtonClickHandler = this._addFavoriteButtonClickHandler.bind(this);
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

  _addToWatchButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.addToWatchButtonClick();
  }

  _addWatchedButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.addWatchedButtonClick();
  }

  _addFavoriteButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.addFavoriteButtonClick();
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

  setAddToWatchButtonClickHandler(callback) {
    this._callback.addToWatchButtonClick = callback;
    this.getElement().querySelector(`.${ClassName.FILM_CARD_CONTROL_TO_WATCH}`)
      .addEventListener('click', this._addToWatchButtonClickHandler);
  }

  setAddWatchedButtonClickHandler(callback) {
    this._callback.addWatchedButtonClick = callback;
    this.getElement().querySelector(`.${ClassName.FILM_CARD_CONTROL_WATCHED}`)
      .addEventListener('click', this._addWatchedButtonClickHandler);
  }

  setAddFavoriteButtonClickHandler(callback) {
    this._callback.addFavoriteButtonClick = callback;
    this.getElement().querySelector(`.${ClassName.FILM_CARD_CONTROL_FAVORITE}`)
      .addEventListener('click', this._addFavoriteButtonClickHandler);
  }
}
