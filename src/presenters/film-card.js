
import { render, remove } from '../utils/render.js';
// import { ClassName } from '../const.js';
import FilmCardView from '../views/film-card.js';

export default class FilmCardPresenter {
  constructor(filmCardContainer) {
    this._filmCardContainer = filmCardContainer;
  }

  init(film, showFilmDetails) {
    this._film = film;

    this._filmCardView = new FilmCardView(this._film);

    this._filmCardView.setTitleClickHandler(() => showFilmDetails(this._film));
    this._filmCardView.setPosterClickHandler(() => showFilmDetails(this._film));
    this._filmCardView.setCommentsClickHandler(() => showFilmDetails(this._film));

    this._render();
  }

  _render() {
    render(this._filmCardContainer, this._filmCardView);
  }
}
