import { FilmsListOption, SortType, FILMS_STEP, EXTRA_FILMS_AMOUNT, ClassName } from '../const.js';
import { render, remove, replace } from '../utils/render.js';
import { sortByRating, sortByDate } from '../utils/film.js';
import SortBarView from '../views/sort-bar.js';
import FilmsBoardView from '../views/films-board.js';
import FilmsListView from '../views/films-list.js';
import FilmsContainerView from '../views/films-container.js';
import ShowMoreButtonView from '../views/show-more-button.js';
import FilmCardPresenter from './film-card.js';
import FilmDetailsPresenter from './film-details.js';

const bodyElement = document.body;

export default class MainScreenPresenter {
  constructor(mainScreenContainer, filmsModel) {
    this._mainScreenContainer = mainScreenContainer;
    this._filmsModel = filmsModel;
    this._currentSortType = SortType.DEFAULT;

    this._mainFilmPresenter = new Map();
    this._topRatedFilmPresenter = new Map();
    this._mostCommentedFilmPresenter = new Map();

    this._filmsBoardView = new FilmsBoardView();
    this._showMoreButtonView = new ShowMoreButtonView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._showFilmDetails = this._showFilmDetails.bind(this);
    this._hideFilmDetails = this._hideFilmDetails.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init() {
    this._filmsModel.addObserver(this._handleModelEvent);

    this._renderMainScreen();
  }

  get _allFilms() {
    return this._filmsModel.getAll();
  }

  get _mainFilms() {
    const films = [...this._filmsModel.getAll()];

    switch (this._currentSortType) {
      case SortType.DATE:
        films.sort(sortByDate);
        break;
      case SortType.RATING:
        films.sort(sortByRating);
        break;
    }

    return films;
  }

  get _topRatedFilms() {
    return this._filmsModel.getTopRated().slice(0, EXTRA_FILMS_AMOUNT);
  }

  get _mostCommentedFilms() {
    return this._filmsModel.getMostCommented().slice(0, EXTRA_FILMS_AMOUNT);
  }

  _handleSortTypeChange(sortType) {
    if (sortType === this._currentSortType) {
      return;
    }

    this._currentSortType = sortType;

    this._renderSortBar();
    this._renderMainFilmsList();
  }

  _handleViewAction(actionType, updateType, updatedData) {
    this._filmsModel.update(updateType, updatedData);
  }

  _handleModelEvent(updateType, updatedFilm) {
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
  }

  _handleShowMoreButtonClick() {
    this._renderPartialMainFilms(this._mainFilmsCount, this._mainFilmsCount + FILMS_STEP);
    this._mainFilmsCount += FILMS_STEP;

    if (this._mainFilmsCount >= this._mainFilms.length) {
      remove(this._showMoreButtonView);
    }
  }

  _showFilmDetails(film) {
    if (this._filmDetailsPresenter &&
        this._filmDetailsPresenter.filmId !== film.id) {
      this._filmDetailsPresenter.destroy();
      this._filmDetailsPresenter = new FilmDetailsPresenter(bodyElement, this._handleViewAction, this._hideFilmDetails);
    }

    if (!this._filmDetailsPresenter) {
      bodyElement.classList.add(ClassName.HIDE_OVERFLOW);
      this._filmDetailsPresenter = new FilmDetailsPresenter(bodyElement, this._handleViewAction, this._hideFilmDetails);
    }

    this._filmDetailsPresenter.init(film);
  }

  _hideFilmDetails() {
    bodyElement.classList.remove(ClassName.HIDE_OVERFLOW);
    this._filmDetailsPresenter.destroy();
    this._filmDetailsPresenter = null;
  }

  _renderEmptyBoard() {
    render(this._filmsBoardView, new FilmsListView(FilmsListOption.EMPTY));
  }

  _renderSortBar() {
    const prevSortBarView = this._sortBarView;
    this._sortBarView = new SortBarView(this._currentSortType);
    this._sortBarView.setSortTypeChangeHandler(this._handleSortTypeChange);

    if (prevSortBarView) {
      replace(this._sortBarView, prevSortBarView);
    } else {
      render(this._mainScreenContainer, this._sortBarView);
    }
  }

  _renderFilmCard(filmCardContainer, film, type) {
    const filmCardPresenter = new FilmCardPresenter(filmCardContainer, this._handleViewAction, this._showFilmDetails);
    filmCardPresenter.init(film);
    this[`_${type}FilmPresenter`].set(film.id, filmCardPresenter);
  }

  _renderPartialMainFilms(from, to) {
    this._mainFilms.slice(from, to)
      .forEach((film) => {
        this._renderFilmCard(this._mainFilmsContainerView, film, FilmsListOption.MAIN.type);
      });
  }

  _renderShowMoreButtonClick() {
    this._showMoreButtonView.setClickHandler(this._handleShowMoreButtonClick);
    render(this._mainFilmsListView, this._showMoreButtonView);
  }

  _renderMainFilmsList() {
    const prevMainFilmsListView = this._mainFilmsListView;
    this._mainFilmsListView = new FilmsListView(FilmsListOption.MAIN);
    this._mainFilmsContainerView = new FilmsContainerView();

    render(this._mainFilmsListView, this._mainFilmsContainerView);

    this._mainFilmPresenter.clear();
    this._mainFilmsCount = FILMS_STEP;
    this._renderPartialMainFilms(0, this._mainFilmsCount);

    if (this._mainFilmsCount < this._mainFilms.length) {
      this._renderShowMoreButtonClick();
    }

    if (prevMainFilmsListView) {
      replace(this._mainFilmsListView, prevMainFilmsListView);
    } else {
      render(this._filmsBoardView, this._mainFilmsListView);
    }
  }

  _renderExtraFilmsList(option) {
    const { type } = option;
    const extraFilms = this[`_${type}Films`];
    const prevExtraFilmsListView = this[`_${type}FilmsListView`];

    if (!extraFilms.length) {
      this[`_${type}FilmPresenter`].clear();

      if (prevExtraFilmsListView) {
        remove(prevExtraFilmsListView);
        this[`_${type}FilmsListView`] = null;
      }

      return;
    }

    this[`_${type}FilmsListView`] = new FilmsListView(option);
    this[`_${type}FilmsContainerView`] = new FilmsContainerView();

    const currentExtraFilmsListView = this[`_${type}FilmsListView`];
    const currentExtraFilmsContainerView = this[`_${type}FilmsContainerView`];

    render(currentExtraFilmsListView, currentExtraFilmsContainerView);

    extraFilms.forEach((film) => {
      this._renderFilmCard(currentExtraFilmsContainerView, film, type);
    });

    if (prevExtraFilmsListView) {
      replace(currentExtraFilmsListView, prevExtraFilmsListView);
    } else {
      render(this._filmsBoardView, currentExtraFilmsListView);
    }
  }

  _renderFilmsBoard() {
    this._renderMainFilmsList();
    this._renderExtraFilmsList(FilmsListOption.TOP_RATED);
    this._renderExtraFilmsList(FilmsListOption.MOST_COMMENTED);
  }

  _renderMainScreen() {
    if (this._allFilms.length) {
      this._renderSortBar();
      this._renderFilmsBoard();
    } else {
      this._renderEmptyBoard();
    }

    render(this._mainScreenContainer, this._filmsBoardView);
  }
}
