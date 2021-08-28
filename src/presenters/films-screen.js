import { FilmsListOption, SortType, FILMS_STEP, EXTRA_FILMS_AMOUNT, ClassName, UpdateType, UserAction, filterTypeToEmptyTitle } from '../const.js';
import { render, remove, replace } from '../utils/render.js';
import { sortByRating, sortByDate, filter } from '../utils/film.js';
import SortBarView from '../views/sort-bar.js';
import FilmsBoardView from '../views/films-board.js';
import FilmsListView from '../views/films-list.js';
import FilmsContainerView from '../views/films-container.js';
import ShowMoreButtonView from '../views/show-more-button.js';
import FilmCardPresenter from './film-card.js';
import FilmDetailsPresenter from './film-details.js';

const bodyElement = document.body;

export default class FilmsScreenPresenter {
  constructor(mainScreenContainer, filmsModel, filterModel) {
    this._mainScreenContainer = mainScreenContainer;
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;

    this._mainFilmsCount = FILMS_STEP;

    this._mainFilmPresenter = new Map();
    this._topRatedFilmPresenter = new Map();
    this._mostCommentedFilmPresenter = new Map();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._showFilmDetails = this._showFilmDetails.bind(this);
    this._hideFilmDetails = this._hideFilmDetails.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init() {
    this._currentSortType = SortType.DEFAULT;

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderMainScreen();
  }

  destroy() {
    this._filmsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);

    if (this._sortBarView) {
      remove(this._sortBarView);
      this._sortBarView = null;
    }

    if (this._filmsBoardView) {
      remove(this._filmsBoardView);
      this._filmsBoardView = null;
    }

    if (this._filmDetailsPresenter) {
      this._filmDetailsPresenter.destroy();
      this._filmDetailsPresenter = null;
    }

  }

  get _allFilms() {
    return this._filmsModel.getAll();
  }

  get _mainFilms() {
    const films = this._filmsModel.getAll();
    const currentFilter = this._filterModel.getFilter();
    const filteredFilms = filter[currentFilter](films);

    switch (this._currentSortType) {
      case SortType.DATE:
        filteredFilms.sort(sortByDate);
        break;
      case SortType.RATING:
        filteredFilms.sort(sortByRating);
        break;
    }

    return filteredFilms;
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
    this._mainFilmsCount = FILMS_STEP;
    this._renderMainFilmsList({ update: true });
  }

  _handleViewAction(actionType, updateType, payload) {
    switch (actionType) {
      case UserAction.UPDATE_FILM_USER_DETAILS:
        this._filmsModel.updateFilm(updateType, payload);
        break;
      case UserAction.DELETE_COMMENT:
        this._filmsModel.deleteComment(updateType, payload);
        break;
      case UserAction.CREATE_COMMENT:
        this._filmsModel.createComment(updateType, payload);
        break;
    }

  }

  _handleModelEvent(updateType, updatedFilm) {
    switch (updateType) {
      case UpdateType.PATCH:
        if (this._mainFilmPresenter.has(updatedFilm.id)) {
          this._mainFilmPresenter.get(updatedFilm.id).init(updatedFilm);
        }

        if (this._topRatedFilmPresenter.has(updatedFilm.id)) {
          this._topRatedFilmPresenter.get(updatedFilm.id).init(updatedFilm);
        }

        this._renderExtraFilmsList({
          isReplace: true,
          option: FilmsListOption.MOST_COMMENTED,
        });
        break;

      case UpdateType.MINOR:
        this._renderMainScreen();
        break;

      case UpdateType.MAJOR:
        this._renderMainScreen({ resetFilmsCount: true });
        break;
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
      this._filmDetailsPresenter = new FilmDetailsPresenter(bodyElement, this._filmsModel, this._handleViewAction, this._hideFilmDetails);
    }

    if (!this._filmDetailsPresenter) {
      bodyElement.classList.add(ClassName.HIDE_OVERFLOW);
      this._filmDetailsPresenter = new FilmDetailsPresenter(bodyElement, this._filmsModel, this._handleViewAction, this._hideFilmDetails);
    }

    this._filmDetailsPresenter.init(film);
  }

  _hideFilmDetails() {
    bodyElement.classList.remove(ClassName.HIDE_OVERFLOW);
    this._filmDetailsPresenter.destroy();
    this._filmDetailsPresenter = null;
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
    this._showMoreButtonView = new ShowMoreButtonView();
    this._showMoreButtonView.setClickHandler(this._handleShowMoreButtonClick);
    render(this._mainFilmsListView, this._showMoreButtonView);
  }

  _renderMainFilmsList({ update = false } = {}) {
    const prevMainFilmsListView = update ? this._mainFilmsListView : null;
    this._mainFilmsListView = new FilmsListView(FilmsListOption.MAIN);
    this._mainFilmsContainerView = new FilmsContainerView();

    render(this._mainFilmsListView, this._mainFilmsContainerView);
    this._mainFilmPresenter.clear();

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

  _renderExtraFilmsList({option, isReplace = false} = {}) {
    const { type } = option;
    const prevExtraFilmsListView = this[`_${type}FilmsListView`];
    const extraFilms = this[`_${type}Films`];

    this[`_${type}FilmPresenter`].clear();

    this[`_${type}FilmsListView`] = new FilmsListView(option);
    this[`_${type}FilmsContainerView`] = new FilmsContainerView();

    const currentExtraFilmsListView = this[`_${type}FilmsListView`];
    const currentExtraFilmsContainerView = this[`_${type}FilmsContainerView`];

    render(currentExtraFilmsListView, currentExtraFilmsContainerView);

    extraFilms.forEach((film) => {
      this._renderFilmCard(currentExtraFilmsContainerView, film, type);
    });

    if (prevExtraFilmsListView && isReplace) {
      replace(currentExtraFilmsListView, prevExtraFilmsListView);
    } else {
      render(this._filmsBoardView, currentExtraFilmsListView);
    }
  }

  _renderMainScreen({ resetFilmsCount = false} = {}) {
    if (resetFilmsCount) {
      this._mainFilmsCount = FILMS_STEP;
    }

    if (this._sortBarView) {
      remove(this._sortBarView);
      this._sortBarView = null;
    }

    if (this._filmsBoardView) {
      remove(this._filmsBoardView);
    }

    this._filmsBoardView = new FilmsBoardView();

    if (this._mainFilms.length) {
      this._renderSortBar();
      this._renderMainFilmsList();
    } else {
      render(this._filmsBoardView, new FilmsListView({title: filterTypeToEmptyTitle[this._filterModel.getFilter()]}));
    }

    if (this._allFilms.length) {
      this._renderExtraFilmsList({ option: FilmsListOption.TOP_RATED });
      this._renderExtraFilmsList({ option: FilmsListOption.MOST_COMMENTED });
    }

    render(this._mainScreenContainer, this._filmsBoardView);
  }
}
