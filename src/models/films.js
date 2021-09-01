import { updateItem } from '../utils/common.js';
import { sortByRating, sortByComments, hasComments, hasRating } from '../utils/film.js';
import { createComment, deleteComment, getCommentsByIds } from '../mock/comments.js';

import AbstractObserver from '../utils/abstract-observer.js';

export default class FilmsModel extends AbstractObserver{
  constructor(films = []) {
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

  setFilms(updateType, films) {
    this._films = [ ...films ];

    this._notify(updateType, films);
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

  static adaptFilmToClient(film) {
    const clientFilm = { ... film};

    clientFilm.filmInfo = {
      ...film['film_info'],
      originalTitle: film['film_info']['alternative_title'],
      genres: [ ...film['film_info'].genre ],
      ageRating: film['film_info']['age_rating'],
      releaseDate: new Date(film['film_info'].release.date),
      country: film['film_info'].release['release_country'],
      rating: film['film_info']['total_rating'],
      poster: film['film_info'].poster.split('images/posters/')[1],
    };

    clientFilm.userDetails = {
      isToWatch: film['user_details'].watchlist,
      isFavorite: film['user_details'].favorite,
      isWatched: film['user_details']['already_watched'],
      watchingDate: film['user_details']['watching_date'] ? new Date(film['user_details']['watching_date']) : null,
    };

    delete clientFilm['film_info'];

    delete clientFilm.filmInfo['alternative_title'];
    delete clientFilm.filmInfo['age_rating'];
    delete clientFilm.filmInfo['total_rating'];
    delete clientFilm.filmInfo.release;
    delete clientFilm.filmInfo.genre;

    delete clientFilm['user_details'];

    return clientFilm;
  }

  static adaptFilmToServer(film) {
    const serverFilm = { ... film};

    serverFilm['film_info'] = {
      ...film.filmInfo,
      ['alternative_title']: film.filmInfo.originalTitle,
      genre: [ ...film.filmInfo.genres],
      ['age_rating']: film.filmInfo.ageRating,
      ['total_rating']: film.filmInfo.rating,
      poster: `'images/posters/'${film.filmInfo.poster}`,
    };

    serverFilm['film_info'].release = {
      date: film.filmInfo.releaseDate ? film.filmInfo.releaseDate.toISOString() : null,
      ['release_country']: film.filmInfo.country,
    };

    serverFilm['user_details'] = {
      watchlist: film.userDetails.isToWatch,
      favorite: film.userDetails.isFavorite,
      ['already_watched']: film.userDetails.isWatched,
      ['watching_date']: film.userDetails.watchingDate ? film.userDetails.watchingDate.toISOString(): null,
    };

    console.log(serverFilm);

    delete serverFilm.filmInfo;

    delete serverFilm['film_info'].originalTitle;
    delete serverFilm['film_info'].genres;
    delete serverFilm['film_info'].country;
    delete serverFilm['film_info'].releaseDate;
    delete serverFilm['film_info'].ageRating;
    delete serverFilm['film_info'].rating;

    delete serverFilm.userDetails;

    return serverFilm;
  }

  static adaptCommentToClient(comment) {
    const clientComment = { ...comment };

    clientComment.text = comment.comment;
    clientComment.date = new Date(comment.date);

    delete clientComment.comment;

    return clientComment;
  }
}
