import { getAllFilms } from '../mock/films.js';
import { render, rerender, replace, remove } from '../utils/render';
import { Screen, FilterType, UpdateType, EmptyBoardTitle } from '../const.js';
import { filter } from '../utils/film.js';
import { getRank } from '../utils/statistics';

import HeaderView from '../views/header';
import MainView from '../views/main';
import FooterView from '../views/footer';

import EmptyBoardView from '../views/empty-board.js';
import ProfileView from '../views/profile.js';

import RankModel from '../models/rank.js';
import FilmsModel from '../models/films.js';
import FilterModel from '../models/filter.js';

import NavigationPresenter from './navigation.js';
import FilmsScreenPresenter from './films-screen.js';
import StatisticsScreenPresenter from './statisctics-screen.js';
import FooterStatisticsPresenter from './footer-statistics.js';

export default class ApplicationPresenter {
  constructor(applicationContainer) {
    this._applicationContainer = applicationContainer;

    this._headerView = new HeaderView();
    this._mainView = new MainView();
    this._footerView = new FooterView();
    this._emptyBoardView = new EmptyBoardView(EmptyBoardTitle.LOADING);
    this._profileView = null;

    this._rankModel = new RankModel();
    this._filmsModel = new FilmsModel();
    this._filterModel = new FilterModel();

    this._renderScreen = this._renderScreen.bind(this);

    this._navigationPresenter = new NavigationPresenter(this._mainView, this._filterModel, this._filmsModel, this._renderScreen);
    this._footerStatisticsPresenter = new FooterStatisticsPresenter(this._footerView);  // Переделать на View

    this._handleFilmsModelEvent = this._handleFilmsModelEvent.bind(this);
    this._handleRankModelEvent = this._handleRankModelEvent.bind(this);
  }

  init() {
    // Рендер приложения до загрузки фильмов

    this._navigationPresenter.init();
    render(this._mainView, this._emptyBoardView);  // Рендер заглушки
    this._footerStatisticsPresenter.init();

    render(this._applicationContainer, this._headerView);
    render(this._applicationContainer, this._mainView);
    render(this._applicationContainer, this._footerView);


    // Имитирует обновление приложения при загрузке фильмов с сервера
    setTimeout(() => {
      try {
        // Получение фильмов
        const mockFilms = getAllFilms();

        if (!mockFilms.length) {
          // Ошибка при отсутствии загруженных фильмов
          throw new Error(EmptyBoardTitle.ERROR);
        }


        // Подписка на обновление профиля пользователя
        this._filmsModel.addObserver(this._handleFilmsModelEvent);
        this._rankModel.addObserver(this._handleRankModelEvent);

        // Обновление модели фильмов
        this._filmsModel.setFilms(UpdateType.MINOR, mockFilms);


        // Удаляет заглушку
        remove(this._emptyBoardView);
        this._emptyBoardView = null;


        // Создание презентеров экранов "Фильмы" и "Статистики"
        this._filmsScreenPresenter = new FilmsScreenPresenter(this._mainView, this._filmsModel, this._filterModel);
        this._statisticsScreenPresenter = new StatisticsScreenPresenter(this._mainView, this._rankModel, this._filmsModel);


        // Рендер приложения

        this._renderScreen(Screen.FILMS);
        this._footerStatisticsPresenter.init(this._filmsModel.getAll().length);

      } catch (error) {
        const prevEmptyBoardView = this._emptyBoardView;
        this._emptyBoardView = new EmptyBoardView(error.message);
        replace(this._emptyBoardView, prevEmptyBoardView);
      }
    }, 1000);
  }

  _renderScreen(screen) {
    if (screen === this._currentScreen) {
      return;
    }

    this._currentScreen = screen;
    switch (screen) {
      case Screen.FILMS:
        this._statisticsScreenPresenter.destroy();
        this._filmsScreenPresenter.init();
        break;

      case Screen.STATISTICS:
        this._filmsScreenPresenter.destroy();
        this._statisticsScreenPresenter.init();
        break;
    }
  }

  _renderProfile() {
    const prevProfileView = this._profileView;
    this._profileView = new ProfileView(this._rankModel.getRank());
    rerender(this._profileView, prevProfileView, this._headerView);
  }

  _handleRankModelEvent() {
    this._renderProfile();
  }

  _handleFilmsModelEvent(updateType) {
    if (updateType !== UpdateType.PATCH) {
      const films = this._filmsModel.getAll();
      const watchedFilmsAmount = filter[FilterType.HISTORY](films).length;
      const rank = getRank(watchedFilmsAmount);

      if (rank !== this._rankModel.getRank()) {
        this._rankModel.setRank(UpdateType.MAJOR, rank);
      }
    }
  }
}
