
import { render, replace } from '../utils/render.js';
import { getCurrentDate } from '../utils/date.js';
import FilmCardView from '../views/film-card.js';

export default class FilmCardPresenter {
  constructor(filmCardContainer, changeFilm, showFilmDetails) {
    this._filmCardContainer = filmCardContainer;
    this._changeFilm = changeFilm;
    this._showFilmDetails = showFilmDetails;

    this._handleTitleClick = this._handleTitleClick.bind(this);
    this._handlePosterClick = this._handlePosterClick.bind(this);
    this._handleCommentsClick = this._handleCommentsClick.bind(this);

    this._handleAddToWatchClick = this._handleAddToWatchClick.bind(this);
    this._handleAddWatchedClick = this._handleAddWatchedClick.bind(this);
    this._handleAddFavoriteClick = this._handleAddFavoriteClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCard = this._filmCardView;

    this._filmCardView = new FilmCardView(this._film);

    this._filmCardView.setTitleClickHandler(this._handleTitleClick);
    this._filmCardView.setPosterClickHandler(this._handlePosterClick);
    this._filmCardView.setCommentsClickHandler(this._handleCommentsClick);

    this._filmCardView.setAddToWatchButtonClickHandler(this._handleAddToWatchClick);
    this._filmCardView.setAddWatchedButtonClickHandler(this._handleAddWatchedClick);
    this._filmCardView.setAddFavoriteButtonClickHandler(this._handleAddFavoriteClick);

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
    this._changeFilm({
      ...this._film,
      userDetails: {
        ...this._film.userDetails,
        isToWatch: !this._film.userDetails.isToWatch,
      },
    });
  }

  _handleAddWatchedClick() {
    this._changeFilm({
      ...this._film,
      userDetails: {
        ...this._film.userDetails,
        isWatched: !this._film.userDetails.isWatched,
        watchingDate: !this._film.userDetails.isWatched ? getCurrentDate() : '',
      },
    });
  }

  _handleAddFavoriteClick() {
    this._changeFilm({
      ...this._film,
      userDetails: {
        ...this._film.userDetails,
        isFavorite: !this._film.userDetails.isFavorite,
      },
    });
  }
}
