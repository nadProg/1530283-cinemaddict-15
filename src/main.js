import { Place } from './const.js';
import { generateFilms, getTopRatedFilms, getMostCommentedFilms  } from './mock/films.js';
import { generateComments, getCommentsByIds, generateNewComment } from './mock/comments.js';
import { generateFilters, getFilterCountByName } from './mock/filters.js';
import { ClassName, COMMENTS_AMOUNT, EXTRA_FILMS_AMOUNT, FILMS_STEP, SORT_TYPES, MAX_FILMS_AMOUNT, MIN_FILMS_AMOUNT } from './const.js';
import { getRandomInteger, renderAfterEnd, renderBeforeEnd, render } from './utils.js';
import ProfileView from './views/profile.js';
import NavigationView from './views/navigation.js';
import { createSortListTemplate } from './views/sort-list.js';
import { createFilmsTemplate } from './views/films.js';
import { createFilmCardTemplate } from './views/film-card.js';
import { createShowMoreButtonTemplate } from './views/show-more-button.js';
import FooterStatisticView from './views/footer-statistic.js';
import { createFilmDetailsTemplate } from './views/film-details.js';
import { createCommentsListTemplate } from './views/comments-list.js';
import { createNewCommentTemplate } from './views/new-comment.js';


// Генерация моковых данных

const filmsAmount = getRandomInteger(MIN_FILMS_AMOUNT, MAX_FILMS_AMOUNT);

const mockFilms = generateFilms(filmsAmount);
const comments = generateComments(COMMENTS_AMOUNT);

const mockFilters = generateFilters(mockFilms);
const allFilmsAmount = getFilterCountByName(mockFilters, 'all');
const historyFilmsAmount = getFilterCountByName(mockFilters, 'history');

const topRatedFilms = getTopRatedFilms(mockFilms);
const mostCommentedFilms = getMostCommentedFilms(mockFilms);

const popupFilm = mockFilms[0];
const popupFilmComments = getCommentsByIds(comments, popupFilm.comments);
const newComment = generateNewComment();


// Поиск основных узлов для рендеринга

const bodyElement = document.body;
const headerElement = bodyElement.querySelector(`.${ClassName.HEADER}`);
const mainElement = bodyElement.querySelector(`.${ClassName.MAIN}`);
const footerElement = bodyElement.querySelector(`.${ClassName.FOOTER}`);


// Функция рендеринга звания пользователя в хедере

const renderProfile = (container, watchedFilmsAmount) => {
  const profileComponent = new ProfileView(watchedFilmsAmount);
  render(container, profileComponent.getElement(), Place.BEFORE_END);
};


// Функция рендеринга навигации с фильтрами

const renderNavigation = (container, filters, activeItem) => {
  const navigationComponent = new NavigationView(filters, activeItem);
  render(container, navigationComponent.getElement(), Place.BEFORE_END);
};


// Рендеринг основного экрана - сортировка, списки фильмов, кнопка "Show More"

// renderBeforeEnd(mainElement, createSortListTemplate(SORT_TYPES, SORT_TYPES[0]));
// renderBeforeEnd(mainElement, createFilmsTemplate());

// const [
//   mainFilmsListNode,
//   topRatedFilmsListNode,
//   mostCommentedFilmsListNode,
// ] = mainElement.querySelectorAll(`.${ClassName.FILMS_CONTAINER}`);

// renderAfterEnd(mainFilmsListNode, createShowMoreButtonTemplate());

// const shohMoreButtonNode = mainElement.querySelector(`.${ClassName.SHOW_MORE_BUTTON}`);

// topRatedFilms
//   .slice(0, EXTRA_FILMS_AMOUNT)
//   .forEach((film) => renderBeforeEnd(topRatedFilmsListNode, createFilmCardTemplate(film)));

// mostCommentedFilms
//   .slice(0, EXTRA_FILMS_AMOUNT)
//   .forEach((film) => renderBeforeEnd(mostCommentedFilmsListNode, createFilmCardTemplate(film)));


// Функция рендеринга статистики в футере

const renderFooterStatisctic = (container, amount) => {
  const footerStatisticComponent = new FooterStatisticView(amount);
  render(container, footerStatisticComponent.getElement(), Place.BEFORE_END);
};


// Рендеринг попапа для первого фильма из списка

// renderBeforeEnd(bodyNode, createFilmDetailsTemplate(popupFilm));
// bodyNode.classList.add(ClassName.HIDE_OVERFLOW);

// const popupCommentsContainerNode = document.querySelector(`.${ClassName.COMMENTS_CONTAINER}`);

// renderBeforeEnd(popupCommentsContainerNode, createCommentsListTemplate(popupFilmComments));
// renderBeforeEnd(popupCommentsContainerNode, createNewCommentTemplate(newComment));


// Активация кнопки "Show More"

// let renderedFilmsAmount = 0;

// const onShowMoreButtonNodeClick = (evt) => {
//   evt.preventDefault();

//   films
//     .slice(renderedFilmsAmount, renderedFilmsAmount + FILMS_STEP)
//     .forEach((film) => renderBeforeEnd(mainFilmsListNode, createFilmCardTemplate(film)));

//   renderedFilmsAmount += FILMS_STEP;

//   if (renderedFilmsAmount >= filmsAmount) {
//     shohMoreButtonNode.remove();
//   }
// };

// shohMoreButtonNode.addEventListener('click', onShowMoreButtonNodeClick);


// Вызов клика для рендеринга первых пяти карточек фильмов

// shohMoreButtonNode.click();


// Рендеринг

renderProfile(headerElement, historyFilmsAmount);
renderNavigation(mainElement, mockFilters, mockFilters[0].name);


renderFooterStatisctic(footerElement, allFilmsAmount);
