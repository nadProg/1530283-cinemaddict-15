import { getAllFilms } from './mock/films.js';
import { filter } from './utils/film.js';
import { ClassName, FilterType } from './const.js';
import { render } from './utils/render.js';
import FilmsModel from './models/films.js';
import FilterModel from './models/filter.js';
import ProfileView from './views/profile.js';
import FooterStatisticView from './views/footer-statistic.js';
import NavigationPresenter from './presenters/navigation.js';
import MainScreenPresenter from './presenters/main-screen.js';

// Генерация моковых данных

const mockFilms = getAllFilms();


// Поиск основных узлов для рендеринга

const bodyElement = document.body;
const headerElement = bodyElement.querySelector(`.${ClassName.HEADER}`);
const mainElement = bodyElement.querySelector(`.${ClassName.MAIN}`);
const footerElement = bodyElement.querySelector(`.${ClassName.FOOTER}`);


// Функция рендеринга звания пользователя в хедере

const renderProfile = (container, watchedFilmsAmount) => {
  const profileView = new ProfileView(watchedFilmsAmount);
  render(container, profileView);
};


// Функция рендеринга статистики в футере

const renderFooterStatisctic = (container, amount) => {
  const footerStatisticView = new FooterStatisticView(amount);
  render(container, footerStatisticView);
};


// Рендеринг приложения

const filterModel = new FilterModel();
const filmsModel = new FilmsModel(mockFilms);

const navigationPresenter = new NavigationPresenter(mainElement, filterModel, filmsModel);
const mainScreenPresenter = new MainScreenPresenter(mainElement, filmsModel, filterModel);

// Статус пользователя пока не обновляется при изменении просмотренных фильмов
// Обновление будет после реализации экрана стастики и рефакторинга всего приложения
renderProfile(headerElement, filter[FilterType.HISTORY](mockFilms).length);
renderFooterStatisctic(footerElement, mockFilms.length);

navigationPresenter.init();
mainScreenPresenter.init();
