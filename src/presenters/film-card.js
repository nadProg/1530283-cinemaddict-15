
import { render, remove } from '../utils/render.js';
import { ClassName } from '../const.js';
import FilmCardView from '../views/film-card.js';

const bodyElement = document.body;

export default class FilmCardPresenter {
  constructor(filmCardContainer) {
    this._filmCardContainer = filmCardContainer;
  }

  init(film) {
    this._film = film;

    this._filmCardView = new FilmCardView(this._film);

    const showFilmDetails = () => {
      bodyElement.classList.add(ClassName.HIDE_OVERFLOW);
      // renderFilmDetails(bodyElement, film);
    };

    this._filmCardView.setTitleClickHandler(showFilmDetails);
    this._filmCardView.setPosterClickHandler(showFilmDetails);
    this._filmCardView.setCommentsClickHandler(showFilmDetails);

    this._render();
  }

  _render() {
    render(this._filmCardContainer, this._filmCardView);
  }
}
