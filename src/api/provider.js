import { isOnline } from '../utils/common.js';

import FilmsModel from '../models/films.js';

const createStoreStructure = (items) => items.reduce((store, item) => ({
  ...store,
  [item.id]: item,
}), {});

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  async getFilms() {
    if (isOnline()) {
      const films = await this._api.getFilms();

      const items = createStoreStructure(films.map(FilmsModel.adaptFilmToServer));
      this._store.setItems(items);

      return films;
    }

    const storeTasks = Object.values(this._store.getItems());

    return Promise.resolve(storeTasks.map(FilmsModel.adaptFilmToClient));
  }

  async updateFilm(film, { isServerUpdate = true} = {} ) {
    if (isOnline()) {
      const updatedFilm = isServerUpdate ? await this._api.updateFilm(film) : film;

      this._store.setItem(updatedFilm.id, FilmsModel.adaptFilmToServer(updatedFilm));

      return updatedFilm;
    }

    this._store.setItem(film.id, FilmsModel.adaptFilmToServer({ ...film }));

    return Promise.resolve(film);
  }

  async getComments(filmId) {
    if (isOnline()) {
      return await this._api.getComments(filmId);
    }

    return Promise.reject(new Error('Get comments failed'));
  }

  async addComment(filmId, newComment) {
    if (isOnline()) {
      const updatedPayload = await this._api.addComment(filmId, newComment);

      const { updatedFilm } = updatedPayload;
      this._store.setItem(updatedFilm.id, FilmsModel.adaptFilmToServer(updatedFilm));

      return updatedPayload;
    }

    return Promise.reject(new Error('Create comment failed'));
  }

  async deleteComment(id) {
    if (isOnline()) {
      await this._api.deleteComment(id);
      return;
    }

    return Promise.reject(new Error('Delete comment failed'));
  }

  async sync() {
    if (isOnline()) {
      const storeFilms = Object.values(this._store.getItems());

      const { updated: updatedFilms } = await this._api.sync(storeFilms);

      const items = createStoreStructure([ ...updatedFilms ]);
      this._store.setItems(items);

      return;
    }

    return Promise.reject(new Error('Sync data failed'));
  }
}
