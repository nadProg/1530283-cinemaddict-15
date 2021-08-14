import { isEsc } from '../utils/common.js';
import { getCurrentDate } from '../utils/date.js';
import { render, replace, remove } from '../utils/render.js';
import FilmDetailsBottomView from '../views/film-details-bottom.js';
import FilmDetailsView from '../views/film-details.js';
import CommentsContainerView from '../views/comments-container.js';

export default class FilmDetailsPresenter {
  constructor(filmDetailsContainer, changeFilm, closeFilmDetails) {
    this._filmDetailsContainer = filmDetailsContainer;
    this._changeFilm = changeFilm;
    this._closeFilmDetails = closeFilmDetails;

    this._filmDetailsView = null;
    this._filmDetailsBottomView = new FilmDetailsBottomView();
    this._commentsContainerViewView = new CommentsContainerView();

    this._closeFilmDetails = this._closeFilmDetails.bind(this);

    this._handleAddToWatchClick = this._handleAddToWatchClick.bind(this);
    this._handleAddWatchedClick = this._handleAddWatchedClick.bind(this);
    this._handleAddFavoriteClick = this._handleAddFavoriteClick.bind(this);
  }

  init(film) {
    this._film = film;
    // this._filmComments = getCommentsByIds(mockComments, this._film.comments);

    const prevFilmDetailsView = this._filmDetailsView;

    this._filmDetailsView = new FilmDetailsView(this._film);

    this._filmDetailsView.setCloseButtonClickHandler(this._closeFilmDetails);

    this._filmDetailsView.setAddToWatchButtonClickHandler(this._handleAddToWatchClick);
    this._filmDetailsView.setAddWatchedButtonClickHandler(this._handleAddWatchedClick);
    this._filmDetailsView.setAddFavoriteButtonClickHandler(this._handleAddFavoriteClick);

    render(this._filmDetailsView, this._filmDetailsBottomView);
    render(this._filmDetailsBottomView, this._commentsContainerViewView);
    // renderComments(commentsContainerViewView, filmComments, mockNewComment);

    if (prevFilmDetailsView) {
      document.removeEventListener('keydown', this._onDocumentKeydown);
      replace(this._filmDetailsView, prevFilmDetailsView);
    } else {
      render(this._filmDetailsContainer, this._filmDetailsView);
    }

    this._onDocumentKeydown = (evt) => {
      if (isEsc(evt)) {
        evt.preventDefault();
        this._closeFilmDetails();
      }
    };

    document.addEventListener('keydown', this._onDocumentKeydown);
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

  destroy() {
    remove(this._filmDetailsView);
    document.removeEventListener('keydown', this._onDocumentKeydown);
  }
}

// const renderComment = (container, comment) => {
//   const commentView = new CommentView(comment);
//   render(container, commentView);
// };

// const renderComments = (container, comments, newComment) => {
//   const commentTitleView = new CommentsTitleView(comments.length);
//   const commentsListView = new CommentsListView();
//   const newCommentView = new NewCommentView(newComment);

//   comments.forEach((comment) => {
//     renderComment(commentsListView, comment);
//   });

//   render(container, commentTitleView);
//   render(container, commentsListView);
//   render(container, newCommentView);
// };

// const renderFilmDetails = (container, film) => {
//   const filmDetailsView = new FilmDetailsView(film);
//   const filmDetailsBottomView = new FilmDetailsBottomView();
//   const commentsContainerViewView = new CommentsContainerView();

//   const filmComments = getCommentsByIds(mockComments, film.comments);

//   const onDocumentKeydown = (evt) => {
//     if (isEsc(evt)) {
//       evt.preventDefault();
//       hideFilmDetails();
//     }
//   };

//   render(filmDetailsView, filmDetailsBottomView);
//   render(filmDetailsBottomView, commentsContainerViewView);
//   renderComments(commentsContainerViewView, filmComments, mockNewComment);

//   document.addEventListener('keydown', onDocumentKeydown);
//   filmDetailsView.setClickHandler(hideFilmDetails);

//   render(container, filmDetailsView);

//   function hideFilmDetails() {
//     remove(filmDetailsView);
//     bodyElement.classList.remove(ClassName.HIDE_OVERFLOW);
//     document.removeEventListener('keydown', onDocumentKeydown);
//   }
// };
