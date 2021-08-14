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
  constructor(filmDetailsContainer, changeFilm, closeFilmDetails) {
    this._filmDetailsContainer = filmDetailsContainer;
    this._changeFilm = changeFilm;
    this._closeFilmDetails = closeFilmDetails;

    this._filmDetailsView = null;
    this._filmDetailsBottomView = new FilmDetailsBottomView();
    this._commentsContainerView = new CommentsContainerView();
    this._commentsTitleView = new CommentsTitleView();
    this._commentsListView = new CommentsListView();

    this._closeFilmDetails = this._closeFilmDetails.bind(this);

    this._handleAddToWatchClick = this._handleAddToWatchClick.bind(this);
    this._handleAddWatchedClick = this._handleAddWatchedClick.bind(this);
    this._handleAddFavoriteClick = this._handleAddFavoriteClick.bind(this);
  }

  init(film) {
    const prevFilmDetailsView = this._filmDetailsView;

    this._film = film;
    this._filmComments = getCommentsByIds(mockComments, this._film.comments);

    this._renderFilm();
    this._renderComments();
    this._renderNewComment();

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

  reinitFilmInfo(updatedFilm) {
    const prevFilmDetailsView = this._filmDetailsView;
    this._film = updatedFilm;
    this._renderFilm();

    document.removeEventListener('keydown', this._onDocumentKeydown);

    this._onDocumentKeydown = (evt) => {
      if (isEsc(evt)) {
        evt.preventDefault();
        this._closeFilmDetails();
      }
    };

    document.addEventListener('keydown', this._onDocumentKeydown);

    render(this._filmDetailsBottomView, this._commentsContainerView);
    replace(this._filmDetailsView, prevFilmDetailsView);
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

  _renderComment(comment) {
    render(this._commentsContainerView, new CommentView(comment));
  }

  _renderFilm() {
    this._filmDetailsView = new FilmDetailsView(this._film);
    this._filmDetailsBottomView = new FilmDetailsBottomView();

    this._filmDetailsView.setCloseButtonClickHandler(this._closeFilmDetails);

    this._filmDetailsView.setAddToWatchButtonClickHandler(this._handleAddToWatchClick);
    this._filmDetailsView.setAddWatchedButtonClickHandler(this._handleAddWatchedClick);
    this._filmDetailsView.setAddFavoriteButtonClickHandler(this._handleAddFavoriteClick);

    render(this._filmDetailsView, this._filmDetailsBottomView);
  }

  _renderComments() {
    this._commentsContainerView = new CommentsContainerView();
    this._commentsListView = new CommentsListView();
    this._commentsTitleView =  new CommentsTitleView(this._filmComments.length);

    render(this._filmDetailsBottomView, this._commentsContainerView);
    render(this._commentsContainerView, this._commentsTitleView);
    render(this._commentsContainerView, this._commentsListView);

    this._filmComments.forEach((comment) => {
      render(this._commentsListView, new CommentView(comment));
    });
  }

  _renderNewComment() {
    render(this._commentsListView, new NewCommentView({}));
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
