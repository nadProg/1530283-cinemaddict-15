import AbstractView from './abstract.js';

const createFilmDetailsBottomTemplate = () => '<div class="film-details__bottom-container"></div>';

export default class FilmDetailsBottom extends AbstractView {
  getTemplate() {
    return createFilmDetailsBottomTemplate();
  }
}
