import { FilmsListOption, SORT_ITEMS, FILMS_STEP, EXTRA_FILMS_AMOUNT, ClassName } from '../const.js';
import { render, remove } from '../utils/render.js';
import { sortByRating, sortByComments } from '../utils/film.js';
import { updateItem } from '../utils/common.js';
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
    this._mainFilmPresenter = new Map();
    this._topRatedFilmPresenter = new Map();
    this._mostCommentedFilmPresenter = new Map();
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
    this._handleFilmChange = this._handleFilmChange.bind(this);
  }

  init(films) {
    this._films = [...films];
    this._renderMainScreen();
  }

  get _topRatedFilms() {
    return [...this._films].sort(sortByRating).slice(0, EXTRA_FILMS_AMOUNT);
  }

  get _mostCommentedFilms() {
    return [...this._films].sort(sortByComments).slice(0, EXTRA_FILMS_AMOUNT);
  }

  _handleFilmChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);

    // апдейт оригинальной копии
    // this._sourcedBoardTasks = updateItem(this._sourcedBoardTasks, updatedFilm);

    // апдейт мап презентеров - 3шт.
    //  основной список, top rated, most commented
    if (this._mainFilmPresenter.has(updatedFilm.id)) {
      this._mainFilmPresenter.get(updatedFilm.id).init(updatedFilm);
    }

    if (this._topRatedFilmPresenter.has(updatedFilm.id)) {
      this._topRatedFilmPresenter.get(updatedFilm.id).init(updatedFilm);
    }

    if (this._mostCommentedFilmPresenter.has(updatedFilm.id)) {
      this._mostCommentedFilmPresenter.get(updatedFilm.id).init(updatedFilm);
    }

    if (this._filmDetailsPresenter) {
      this._filmDetailsPresenter.init(updatedFilm);
    }

    window.scrollTo(pageXOffset, pageYOffset);
  }

  _showFilmDetails(film) {
    if (!this._filmDetailsPresenter) {
      bodyElement.classList.add(ClassName.HIDE_OVERFLOW);
      this._filmDetailsPresenter = new FilmDetailsPresenter(bodyElement, this._handleFilmChange, this._hideFilmDetails);
    }

    this._filmDetailsPresenter.init(film);
  }

  _hideFilmDetails() {
    bodyElement.classList.remove(ClassName.HIDE_OVERFLOW);
    this._filmDetailsPresenter.destroy();
    this._filmDetailsPresenter = null;
  }

  _renderEmptyBoard() {
    render(this._filmsBoardView, this._epmtyListView);
    render(this._mainScreenContainer, this._filmsBoardView);
  }

  _renderSortBar() {
    render(this._mainScreenContainer, this._sortBarView);
  }

  _renderFilmCard(filmCardContainer, film, type) {
    const filmCardPresenter = new FilmCardPresenter(filmCardContainer, this._handleFilmChange, this._showFilmDetails);
    filmCardPresenter.init(film);
    this[`_${type}FilmPresenter`].set(film.id, filmCardPresenter);
  }

  _renderPartialMainFilms(from, to) {
    this._films.slice(from, to)
      .forEach((film) => {
        this._renderFilmCard(this._mainFilmsContainerView, film, 'main');
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

    this._topRatedFilms.forEach((film) => this._renderFilmCard(this._topRatedFilmsContainerView, film, 'topRated'));
    this._mostCommentedFilms.forEach((film) => this._renderFilmCard(this._mostCommentedFilmsContainerView, film, 'mostCommented'));

    render(this._mainScreenContainer, this._filmsBoardView);
  }

  _renderMainScreen() {
    if (!this._films.length) {
      this._renderEmptyBoard();
      return;
    }

    this._renderSortBar();
    this._renderFilmsBoard();
  }
}
