import { APIMethod, SuccessHTTPStatusRange } from '../const.js';

import FilmsModel from '../models/films.js';
import CommentsModel from '../models/comments.js';

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  async getFilms() {
    const response = await this._load({url: 'movies'});

    const films = await Api.toJSON(response);

    return films.map(FilmsModel.adaptFilmToClient);
  }

  async updateFilm(film) {
    const response = await this._load({
      url: `movies/${film.id}`,
      method: APIMethod.PUT,
      body: JSON.stringify(FilmsModel.adaptFilmToServer(film)),
    });

    const updatedFilm = await Api.toJSON(response);

    return FilmsModel.adaptFilmToClient(updatedFilm);
  }

  async getComments(filmId) {
    const response = await this._load({
      url: `comments/${filmId}`,
      method: APIMethod.GEt,
    });

    const comments = await Api.toJSON(response);

    return comments.map(CommentsModel.adaptCommentToClient);
  }


  async addComment(filmId, newComment) {
    const response = await this._load({
      url: `comments/${filmId}`,
      method: APIMethod.POST,
      body: JSON.stringify(CommentsModel.adaptNewCommentToServer(newComment)),
    });

    const { movie, comments } = await Api.toJSON(response);

    const adaptedResponse = {
      updatedFilm: FilmsModel.adaptFilmToClient(movie),
      updatedComments: comments.map(CommentsModel.adaptCommentToClient),
    };

    return adaptedResponse;
  }

  async deleteComment(id) {
    await this._load({
      url: `comments/${id}`,
      method: APIMethod.DELETE,
    });
  }

  async sync() {
    // Синхронизация с сервером /movies/sync
    // Этот метод потребуется для реализации дополнительного задания про офлайн.
    // Обратите внимание, изменять можно только пользовательскую информацию. То есть то, что находится внутри поля user_details.
    // Пример:
    // Request:
    // URL: POST /movies/sync
    // Headers: Authorization: Basic kTy9gIdsz2317rD
    // Body: [$Movie$, $Movie$]
    // Response:
    // Status: 200 OK
    // Body:
    // {
    //   "updated": [$Movie$, $Movie$]
    // }
  }

  async _load({
    url,
    method = APIMethod.GET,
    body = null,
    headers = new Headers(),
  }) {
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this._authorization);

    const response = await fetch(
      `${this._endPoint}/${url}`,
      {method, body, headers},
    );

    return Api.checkStatus(response);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN ||
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }
}
