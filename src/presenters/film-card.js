
import { render, remove } from '../utils/render.js';
// import { ClassName } from '../const.js';
import FilmCardView from '../views/film-card.js';

export default class FilmCardPresenter {
  constructor(filmCardContainer, filmChange, showFilmDetails) {
    this._filmCardContainer = filmCardContainer;
    this._filmChange = filmChange;
    this._showFilmDetails = showFilmDetails;

    this._handleTitleClick = this._handleTitleClick.bind(this);
    this._handlePosterClick = this._handlePosterClick.bind(this);
    this._handleCommentsClick = this._handleCommentsClick.bind(this);
  }

  init(film) {
    this._film = film;

    this._filmCardView = new FilmCardView(this._film);

    this._filmCardView.setTitleClickHandler(this._handleTitleClick);
    this._filmCardView.setPosterClickHandler(this._handlePosterClick);
    this._filmCardView.setCommentsClickHandler(this._handleCommentsClick);

    // this._filmCardView.setAddToWatchClickHandler(() => filmChange(this._film));

    this._render();
  }

  _handleTitleClick() {
    this._showFilmDetails(this._film);
  }

  _handlePosterClick() {
    this._showFilmDetails(this._film);
  }

  _handleCommentsClick() {
    this._showFilmDetails(this._film);
  }

  _render() {
    render(this._filmCardContainer, this._filmCardView);
  }
}
