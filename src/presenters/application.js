import { getAllFilms } from '../mock/films.js';
import { render } from '../utils/render';
import { Screen, UpdateType, EmptyBoardTitle } from '../const.js';

import HeaderView from '../views/header';
import MainView from '../views/main';
import FooterView from '../views/footer';

import RankModel from '../models/rank.js';
import FilmsModel from '../models/films.js';
import FilterModel from '../models/filter.js';

import ProfilePresenter from './profile.js';
import NavigationPresenter from './navigation.js';
import EmptyBoardPresenter from './empty-board.js';
import FilmsScreenPresenter from './films-screen.js';
import StatisticsScreenPresenter from './statisctics-screen.js';
import FooterStatisticsPresenter from './footer-statistics.js';

export default class ApplicationPresenter {
  constructor(applicationContainer) {
    this._applicationContainer = applicationContainer;

    this._headerView = new HeaderView();
    this._mainView = new MainView();
    this._footerView = new FooterView();

    this._rankModel = new RankModel();
    this._filmsModel = new FilmsModel();
    this._filterModel = new FilterModel();

    this._renderScreen = this._renderScreen.bind(this);

    this._profilePresenter = new ProfilePresenter(this._headerView, this._rankModel, this._filmsModel);
    this._navigationPresenter = new NavigationPresenter(this._mainView, this._filterModel, this._filmsModel, this._renderScreen);
    this._emptyBoardPresenter = new EmptyBoardPresenter(this._mainView);
    this._footerStatisticsPresenter = new FooterStatisticsPresenter(this._footerView);
  }

  init() {
    // Рендер приложения до загрузки фильмов

    this._navigationPresenter.init();
    this._emptyBoardPresenter.init(EmptyBoardTitle.LOADING);
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

        // Обновление модели фильмов
        this._filmsModel.setFilms(UpdateType.MINOR, mockFilms);


        // Демаунт служебного презентера
        this._emptyBoardPresenter.destroy();
        this._emptyBoardPresenter = null;


        // Создание презентеров экранов "Фильмы" и "Статистики"
        this._filmsScreenPresenter = new FilmsScreenPresenter(this._mainView, this._filmsModel, this._filterModel);
        this._statisticsScreenPresenter = new StatisticsScreenPresenter(this._mainView, this._rankModel, this._filmsModel);


        // Рендер приложения

        this._profilePresenter.init();
        this._renderScreen(Screen.FILMS);
        this._footerStatisticsPresenter.init(this._filmsModel.getAll().length);

      } catch (error) {
        this._emptyBoardPresenter.init(error.message);
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
}
