import { updateItem } from '../utils/common.js';
import { sortByRating, sortByComments, hasComments, hasRating } from '../utils/film.js';
import { createComment, deleteComment, getCommentsByIds } from '../mock/comments.js';

import AbstractObserver from '../utils/abstract-observer.js';

export default class FilmsModel extends AbstractObserver{
  constructor(films) {
    super();
    this._films = films;
  }

  getAll() {
    return this._films;
  }

  getTopRated() {
    return [...this._films]
      .filter(hasRating)
      .sort(sortByRating);
  }

  getMostCommented() {
    return [...this._films]
      .filter(hasComments)
      .sort(sortByComments);
  }

  getFilmComments(id) {
    const { comments } = this._films.find((film) => film.id === id);
    return getCommentsByIds(comments);
  }

  updateFilm(updateType, updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);

    this._notify(updateType, updatedFilm);
  }

  createComment(updateType, { film, newComment }) {
    const { id: commentId } = createComment(newComment);

    const updatedFilm = {
      ...film,
      comments: [...film.comments, commentId],
    };

    this.updateFilm(updateType, updatedFilm);
  }

  deleteComment(updateType, { film, commentId }) {
    deleteComment(commentId);

    const updatedFilm = {
      ...film,
      comments: film.comments.filter((id) => id !== commentId),
    };

    this.updateFilm(updateType, updatedFilm);
  }
}
