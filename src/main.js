import { generateFilms } from './mock/films.js';
import { generateComments, generateNewComment } from './mock/comments.js';
import { generateFilters, getFilterCountByName } from './mock/filters.js';
import { ClassName } from './const.js';
import { render } from './utils/render.js';
import ProfileView from './views/profile.js';
import NavigationView from './views/navigation.js';
import FooterStatisticView from './views/footer-statistic.js';

import MainScreenPresenter from './presenters/main-screen.js';

// Генерация моковых данных

const mockFilms = generateFilms();
const mockComments = generateComments();
const mockNewComment = generateNewComment();

const mockFilters = generateFilters(mockFilms);

const allFilmsAmount = getFilterCountByName(mockFilters, 'all');
const historyFilmsAmount = getFilterCountByName(mockFilters, 'history');


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


// Функция рендеринга навигации с фильтрами

const renderNavigation = (container, filters, activeItem) => {
  const navigationView = new NavigationView(filters, activeItem);
  render(container, navigationView);
};


// Функция рендеринга статистики в футере

const renderFooterStatisctic = (container, amount) => {
  const footerStatisticView = new FooterStatisticView(amount);
  render(container, footerStatisticView);
};


// Рендеринг приложения

const mainScreenPresenter = new MainScreenPresenter(mainElement);

renderProfile(headerElement, historyFilmsAmount);
renderNavigation(mainElement, mockFilters, mockFilters[0].name);
mainScreenPresenter.init(mockFilms);
renderFooterStatisctic(footerElement, allFilmsAmount);
