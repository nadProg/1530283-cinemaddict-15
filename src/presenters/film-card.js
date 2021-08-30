
import { getCurrentDate } from '../utils/date.js';
import { render, replace } from '../utils/render.js';
import { UserAction, UpdateType } from '../const.js';

import FilmCardView from '../views/film-card.js';

export default class FilmCardPresenter {
  constructor(filmCardContainer, changeFilm, showFilmDetails) {
    this._filmCardContainer = filmCardContainer;
    this._changeFilm = changeFilm;
    this._showFilmDetails = showFilmDetails;

    this._handleTitleClick = this._handleTitleClick.bind(this);
    this._handlePosterClick = this._handlePosterClick.bind(this);
    this._handleCommentsClick = this._handleCommentsClick.bind(this);

    this._handleAddToWatchButtonClick = this._handleAddToWatchButtonClick.bind(this);
    this._handleAddWatchedButtonClick = this._handleAddWatchedButtonClick.bind(this);
    this._handleAddFavoriteButtonClick = this._handleAddFavoriteButtonClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCard = this._filmCardView;

    this._filmCardView = new FilmCardView(this._film);

    this._filmCardView.setTitleClickHandler(this._handleTitleClick);
    this._filmCardView.setPosterClickHandler(this._handlePosterClick);
    this._filmCardView.setCommentsClickHandler(this._handleCommentsClick);

    this._filmCardView.setAddToWatchButtonClickHandler(this._handleAddToWatchButtonClick);
    this._filmCardView.setAddWatchedButtonClickHandler(this._handleAddWatchedButtonClick);
    this._filmCardView.setAddFavoriteButtonClickHandler(this._handleAddFavoriteButtonClick);

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

  _handleAddToWatchButtonClick() {
    const updatedFilm = {
      ...this._film,
      userDetails: {
        ...this._film.userDetails,
        isToWatch: !this._film.userDetails.isToWatch,
      },
    };

    this._changeFilm(UserAction.UPDATE_FILM_USER_DETAILS, UpdateType.MINOR, updatedFilm);
  }

  _handleAddWatchedButtonClick() {
    const updatedFilm ={
      ...this._film,
      userDetails: {
        ...this._film.userDetails,
        isWatched: !this._film.userDetails.isWatched,
        watchingDate: !this._film.userDetails.isWatched ? getCurrentDate() : '',
      },
    };

    this._changeFilm(UserAction.UPDATE_FILM_USER_DETAILS, UpdateType.MINOR, updatedFilm);
  }

  _handleAddFavoriteButtonClick() {
    const updatedFilm ={
      ...this._film,
      userDetails: {
        ...this._film.userDetails,
        isFavorite: !this._film.userDetails.isFavorite,
      },
    };

    this._changeFilm(UserAction.UPDATE_FILM_USER_DETAILS, UpdateType.MINOR, updatedFilm);
  }
}
