import { isEsc } from '../utils/common.js';
import { render, replace, remove } from '../utils/render.js';
import FilmDetailsBottomView from '../views/film-details-bottom.js';
import FilmDetailsView from '../views/film-details.js';
import CommentsContainerView from '../views/comments-container.js';

export default class FilmDetailsPresenter {
  constructor(filmDetailsContainer) {
    this._filmDetailsContainer = filmDetailsContainer;
    this._filmDetailsView = null;
    this._filmDetailsBottomView = new FilmDetailsBottomView();
    this._commentsContainerViewView = new CommentsContainerView();
  }

  init(film, hideFilmDetails) {
    this._film = film;
    // this._filmComments = getCommentsByIds(mockComments, this._film.comments);

    const prevFilmDetailsView = this._filmDetailsView;

    this._filmDetailsView = new FilmDetailsView(this._film);

    const onDocumentKeydown = (evt) => {
      if (isEsc(evt)) {
        evt.preventDefault();
        hideFilmDetails();
      }
    };

    document.addEventListener('keydown', onDocumentKeydown);
    this._filmDetailsView.setCloseButtonClickHandler(() => {
      hideFilmDetails();
      document.removeEventListener('keydown', onDocumentKeydown);
    });

    render(this._filmDetailsView, this._filmDetailsBottomView);
    render(this._filmDetailsBottomView, this._commentsContainerViewView);
    // renderComments(commentsContainerViewView, filmComments, mockNewComment);

    if (prevFilmDetailsView) {
      replace(this._filmDetailsView, prevFilmDetailsView);
    } else {
      render(this._filmDetailsContainer, this._filmDetailsView);
    }
  }

  destroy() {
    remove(this._filmDetailsView);
  }

  _render() {
    render(this._filmDetailsContainer, this._filmDetailsView);
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
