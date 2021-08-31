const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilms() {
    return this._load({url: 'movies'});
    // .then(Api.toJSON)
    // .then((tasks) => tasks.map(TasksModel.adaptToClient));
  }

  updateFilm(film) {
    return this._load({
      url: `tasks/${film.id}`,
      method: Method.PUT,
      // body: JSON.stringify(TasksModel.adaptToServer(task)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    // .then(Api.toJSON)
    // .then(TasksModel.adaptToClient);
  }

  getComments(film) {
    return this._load({
      url: `comments/${film.id}`,
      method: Method.GEt,
      headers: new Headers({'Content-Type': 'application/json'}),
    });
  }

  addComment(film) {
    return this._load({
      url: `comments/${film.id}`,
      method: Method.POST,
      // body: JSON.stringify(TasksModel.adaptToServer(task)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    // .then(Api.toJSON)
    // .then(TasksModel.adaptToClient);
  }

  deleteComment(comment) {
    return this._load({
      url: `comments/${comment.id}`,
      method: Method.DELETE,
    });
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) {
    headers.append('Authorization', this._authorization);

    return fetch(
      `${this._endPoint}/${url}`,
      {method, body, headers},
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
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

  static catchError(err) {
    throw err;
  }
}
