import { render, replace, remove } from '../utils/render.js';

import FilmsBoardView from '../views/films-board';
import FilmsListView from '../views/films-list.js';

export default class EmptyBoardPresenter {
  constructor(emptyBoardContainer) {
    this._emptyBoardContainer = emptyBoardContainer;
  }

  init(title) {
    const prevFilmsBoardView = this._filmsBoardView;

    this._filmsBoardView = new FilmsBoardView();
    this._filmsListView = new FilmsListView({ title });

    render(this._filmsBoardView, this._filmsListView);

    if (prevFilmsBoardView) {
      replace(this._filmsBoardView, prevFilmsBoardView);
    } else {
      render(this._emptyBoardContainer, this._filmsBoardView);
    }
  }

  destroy() {
    if (this._filmsBoardView) {
      remove(this._filmsBoardView);
      this._filmsBoardView = null;
    }
  }
}
