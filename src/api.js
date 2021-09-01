import { APIMethod, SuccessHTTPStatusRange } from './const.js';

import FilmsModel from './models/films.js';

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
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const updatedFilm = await Api.toJSON(response);

    return FilmsModel.adaptFilmToClient(updatedFilm);
  }

  async getComments(film) {
    const response = await this._load({
      url: `comments/${film.id}`,
      method: APIMethod.GEt,
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const comments = await Api.toJSON(response);

    return comments.map(FilmsModel.adaptCommentToClient);
  }


  addComment() {
    // Добавление комментария будет реализовано во второй части ДЗ
    // return this._load({
    //   url: `comments/${film.id}`,
    //   method: Method.POST,
    //   body: JSON.stringify({}),
    //   headers: new Headers({'Content-Type': 'application/json'}),
    // });

  }


  deleteComment() {
    // Удаление комментария будет реализовано во второй части ДЗ
    // return this._load({
    //   url: `comments/${comment.id}`,
    //   method: Method.DELETE,
    // });
  }

  async _load({
    url,
    method = APIMethod.GET,
    body = null,
    headers = new Headers(),
  }) {
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
