
import { render, replace } from '../utils/render.js';
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

    this._handleAddToWatchClick = this._handleAddToWatchClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCard = this._filmCardView;

    this._filmCardView = new FilmCardView(this._film);

    this._filmCardView.setTitleClickHandler(this._handleTitleClick);
    this._filmCardView.setPosterClickHandler(this._handlePosterClick);
    this._filmCardView.setCommentsClickHandler(this._handleCommentsClick);

    this._filmCardView.setAddToWatchClickHandler(this._handleAddToWatchClick);

    if (prevFilmCard) {
      replace(this._filmCardView, prevFilmCard);
    } else {
      render(this._filmCardContainer, this._filmCardView);
    }
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

  _handleAddToWatchClick() {
    this._filmChange({
      ...this._film,
      userDetails: {
        ...this._film.userDetails,
        isToWatch: !this._film.userDetails.isToWatch,
      },
    });
  }

  _render() {
    r;
  }
}
