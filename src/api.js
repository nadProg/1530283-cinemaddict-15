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

  async getFilms() {
    const response = await this._load({url: 'movies'});
    return await Api.toJSON(response);
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

  async getComments(film) {
    const response = await this._load({
      url: `comments/${film.id}`,
      method: Method.GEt,
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    return await Api.toJSON(response);
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

  async _load({
    url,
    method = Method.GET,
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

  static catchError(err) {
    throw err;
  }
}
