import { isEsc } from '../utils/common.js';
import { getCurrentDate } from '../utils/date.js';
import { render, replace, remove } from '../utils/render.js';
import { mockComments, getCommentsByIds } from '../mock/comments.js';
import FilmDetailsBottomView from '../views/film-details-bottom.js';
import FilmDetailsView from '../views/film-details.js';
import CommentsContainerView from '../views/comments-container.js';
import CommentsTitleView from '../views/comments-title.js';
import CommentsListView from '../views/comments-list.js';
import CommentView from '../views/comment.js';
import NewCommentView from '../views/new-comment.js';

export default class FilmDetailsPresenter {
  constructor(filmDetailsContainer, changeFilm, hideFilmDetails) {
    this._filmDetailsContainer = filmDetailsContainer;
    this._changeFilm = changeFilm;
    this._hideFilmDetails = hideFilmDetails;

    this._createComment = this._createComment.bind(this);

    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
    this._handleDocumentKeydown = this._handleDocumentKeydown.bind(this);

    this._handleAddToWatchButtonClick = this._handleAddToWatchButtonClick.bind(this);
    this._handleAddWatchedButtonClick = this._handleAddWatchedButtonClick.bind(this);
    this._handleAddFavoriteButtonClick = this._handleAddFavoriteButtonClick.bind(this);
  }

  init(film) {
    this._film = film;
    this._filmComments = getCommentsByIds(mockComments, this._film.comments);
    this._renderFilmDetails();
  }

  get filmId() {
    if (this._film) {
      return this._film.id;
    }

    throw new Error('Film Presenter has not been initialized');
  }

  _createComment() {
    // Здесь будет создание новго комментария

    this._newCommentView.reset();
  }

  _handleCloseButtonClick() {
    this._hideFilmDetails();
  }

  _handleDocumentKeydown(evt) {
    if (isEsc(evt)) {
      evt.preventDefault();
      this._hideFilmDetails();
    }
  }

  _handleAddToWatchButtonClick() {
    this._changeFilm({
      ...this._film,
      userDetails: {
        ...this._film.userDetails,
        isToWatch: !this._film.userDetails.isToWatch,
      },
    });
  }

  _handleAddWatchedButtonClick() {
    this._changeFilm({
      ...this._film,
      userDetails: {
        ...this._film.userDetails,
        isWatched: !this._film.userDetails.isWatched,
        watchingDate: !this._film.userDetails.isWatched ? getCurrentDate() : '',
      },
    });
  }

  _handleAddFavoriteButtonClick() {
    this._changeFilm({
      ...this._film,
      userDetails: {
        ...this._film.userDetails,
        isFavorite: !this._film.userDetails.isFavorite,
      },
    });
  }

  _renderComment(comment) {
    render(this._commentsContainerView, new CommentView(comment));
  }

  _renderFilmInfo() {
    this._filmDetailsView = new FilmDetailsView(this._film);
    this._filmDetailsBottomView = new FilmDetailsBottomView();

    this._filmDetailsView.setCloseButtonClickHandler(this._handleCloseButtonClick);

    this._filmDetailsView.setAddToWatchButtonClickHandler(this._handleAddToWatchButtonClick);
    this._filmDetailsView.setAddWatchedButtonClickHandler(this._handleAddWatchedButtonClick);
    this._filmDetailsView.setAddFavoriteButtonClickHandler(this._handleAddFavoriteButtonClick);

    render(this._filmDetailsView, this._filmDetailsBottomView);
  }

  _renderComments() {
    this._commentsContainerView = new CommentsContainerView();
    this._commentsListView = new CommentsListView();
    this._commentsTitleView =  new CommentsTitleView(this._filmComments.length);

    render(this._commentsContainerView, this._commentsTitleView);
    render(this._commentsContainerView, this._commentsListView);

    this._filmComments.forEach((comment) => {
      render(this._commentsListView, new CommentView(comment));
    });

    render(this._filmDetailsBottomView, this._commentsContainerView);
  }

  _renderNewComment() {
    if (!this._newCommentView) {
      this._newCommentView = new NewCommentView();
      this._newCommentView.setSubmitHandler(this._createComment);
    }

    render(this._commentsListView, this._newCommentView);
  }

  _renderFilmDetails() {
    const prevFilmDetailsView = this._filmDetailsView;
    const scrollTop = prevFilmDetailsView ? this._filmDetailsView.scrollTop : null;

    this._renderFilmInfo();
    this._renderComments();
    this._renderNewComment();

    if (prevFilmDetailsView) {
      document.removeEventListener('keydown', this._handleDocumentKeydown);
      replace(this._filmDetailsView, prevFilmDetailsView);
      this._filmDetailsView.scrollTop = scrollTop;
    } else {
      render(this._filmDetailsContainer, this._filmDetailsView);
    }

    document.addEventListener('keydown', this._handleDocumentKeydown);
  }

  destroy() {
    remove(this._filmDetailsView);
    document.removeEventListener('keydown', this._handleDocumentKeydown);
  }
}
