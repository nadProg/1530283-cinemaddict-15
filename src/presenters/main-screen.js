import { FilmsListOption, SORT_ITEMS, FILMS_STEP, ClassName } from '../const.js';
import { render, remove } from '../utils/render.js';
import SortBarView from '../views/sort-bar.js';
import FilmsBoardView from '../views/films-board.js';
import FilmsListView from '../views/films-list.js';
import FilmsContainerView from '../views/films-container.js';
import ShowMoreButtonView from '../views/show-more-button.js';
import FilmCardPresenter from './film-card.js';
import FilmDetailsPresenter from './film-details.js';

const bodyElement = document.body;

export default class MainScreenPresenter {
  constructor(mainScreenContainer) {
    this._mainScreenContainer = mainScreenContainer;
    this._filmsCount = FILMS_STEP;
    this._filmDetailsPresenter = null;

    this._sortBarView = new SortBarView(SORT_ITEMS, SORT_ITEMS[0]);

    this._filmsBoardView = new FilmsBoardView();

    this._mainFilmsListView = new FilmsListView(FilmsListOption.MAIN);
    this._topRatedFilmsListView = new FilmsListView(FilmsListOption.TOP_RATED);
    this._mostCommentedFilmsListView = new FilmsListView(FilmsListOption.MOST_COMMENTED);
    this._epmtyListView = new FilmsListView(FilmsListOption.EMPTY);

    this._mainFilmsContainerView = new FilmsContainerView();
    this._topRatedFilmsContainerView = new FilmsContainerView();
    this._mostCommentedFilmsContainerView = new FilmsContainerView();

    this._showMoreButtonView = new ShowMoreButtonView();

    this._showFilmDetails = this._showFilmDetails.bind(this);
    this._hideFilmDetails = this._hideFilmDetails.bind(this);
  }

  init(films) {
    this._films = [...films];
    this._render();
  }

  _showFilmDetails(film) {
    bodyElement.classList.add(ClassName.HIDE_OVERFLOW);
    if (!this._filmDetailsPresenter) {
      this._filmDetailsPresenter = new FilmDetailsPresenter(bodyElement);
    }
    this._filmDetailsPresenter.init(film, this._hideFilmDetails);
  }

  _hideFilmDetails() {
    bodyElement.classList.remove(ClassName.HIDE_OVERFLOW);
    if (this._filmDetailsPresenter) {
      this._filmDetailsPresenter.destroy();
      this._filmDetailsPresenter = null;
    }
  }

  _renderEmptyBoard() {
    render(this._filmsBoardView, this._epmtyListView);
    render(this._mainScreenContainer, this._filmsBoardView);
  }

  _renderSortBar() {
    render(this._mainScreenContainer, this._sortBarView);
  }

  _renderFilmCard(filmCardContainer, film) {
    const filmCardPresenter = new FilmCardPresenter(filmCardContainer);
    filmCardPresenter.init(film, this._showFilmDetails);
  }

  _renderPartialMainFilms(from, to) {
    this._films.slice(from, to)
      .forEach((film) => {
        this._renderFilmCard(this._mainFilmsContainerView, film);
      });
  }

  _renderShowMoreButtonClick() {
    const onShowMoreButtonClick = () => {
      this._renderPartialMainFilms(this._filmsCount, this._filmsCount + FILMS_STEP);
      this._filmsCount += FILMS_STEP;

      if (this._filmsCount >= this._films.length) {
        remove(this._showMoreButtonView);
      }
    };

    this._showMoreButtonView.setClickHandler(onShowMoreButtonClick);
    render(this._mainFilmsListView, this._showMoreButtonView);
  }

  _renderFilmsBoard() {
    render(this._filmsBoardView, this._mainFilmsListView);
    render(this._filmsBoardView, this._topRatedFilmsListView);
    render(this._filmsBoardView, this._mostCommentedFilmsListView);

    render(this._mainFilmsListView, this._mainFilmsContainerView);
    render(this._topRatedFilmsListView, this._topRatedFilmsContainerView);
    render(this._mostCommentedFilmsListView, this._mostCommentedFilmsContainerView);

    this._renderPartialMainFilms(0, this._filmsCount);

    if (this._filmsCount < this._films.length) {
      this._renderShowMoreButtonClick();
    }

    render(this._mainScreenContainer, this._filmsBoardView);
  }

  _render() {
    if (!this._films.length) {
      this._renderEmptyBoard();
      return;
    }

    this._renderSortBar();
    this._renderFilmsBoard();
  }
}
