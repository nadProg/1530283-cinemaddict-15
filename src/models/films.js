import { sortByRating, sortByComments, hasComments, hasRating } from '../utils/film.js';
import AbstractObserver from '../utils/abstract-observer.js';
import { createComment, deleteComment } from '../mock/comments.js';
import { getAllFilms, getFilmComments, updateFilm } from '../mock/films.js';

export default class FilmsModel extends AbstractObserver{
  constructor(films) {
    super();
    this._films = films;
  }

  getAll() {
    if (!this._films) {
      this._films = getAllFilms();
    }

    return this._films;
  }

  getTopRated() {
    return [...this.getAll()]
      .filter(hasRating)
      .sort(sortByRating);
  }

  getMostCommented() {
    return [...this.getAll()]
      .filter(hasComments)
      .sort(sortByComments);
  }

  getFilmComments(id) {
    return getFilmComments(id);
  }

  updateFilm(updateType, updatedFilm) {
    updateFilm(updatedFilm.id, updatedFilm);

    this._films = null;
    this._notify(updateType, updatedFilm);
  }

  createComment(updateType, { film, newComment }) {
    const updatedFilm = createComment(film, newComment);

    this._films = null;
    this._notify(updateType, updatedFilm);
  }

  deleteComment(updateType, { film, commentId }) {
    const updatedFilm = deleteComment(film, commentId);

    this._films = null;
    this._notify(updateType, updatedFilm);
  }
}
