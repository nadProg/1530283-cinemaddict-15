import { generateFilms, getTopRatedFilms, getMostCommentedFilms  } from './mock/films.js';
import { generateComments, getCommentsByIds, generateNewComment } from './mock/comments.js';
import { generateFilters, getFilterCountByName } from './mock/filters.js';
import { ClassName, COMMENTS_AMOUNT, EXTRA_FILMS_AMOUNT, FILMS_STEP, SORT_TYPES, MAX_FILMS_AMOUNT, MIN_FILMS_AMOUNT } from './const.js';
import { getRandomInteger, renderAfterEnd, renderBeforeEnd } from './utils.js';
import { createProfileTemplate } from './views/profile.js';
import { createNavigationTemplate } from './views/navigation.js';
import { createSortListTemplate } from './views/sort-list.js';
import { createFilmsTemplate } from './views/films.js';
import { createFilmCardTemplate } from './views/film-card.js';
import { createShowMoreButtonTemplate } from './views/show-more-button.js';
import { createFooterStatisticsTemplate } from './views/footer-statistics.js';
import { createFilmDetailsTemplate } from './views/film-details.js';
import { createCommentsListTemplate } from './views/comments-list.js';
import { createNewCommentTemplate } from './views/new-comment.js';


// Генерация моковых данных

const filmsAmount = getRandomInteger(MIN_FILMS_AMOUNT, MAX_FILMS_AMOUNT);

const films = generateFilms(filmsAmount);
const comments = generateComments(COMMENTS_AMOUNT);

const filters = generateFilters(films);
const allFilmsAmount = getFilterCountByName(filters, 'all');
const historyFilmsAmount = getFilterCountByName(filters, 'history');

const topRatedFilms = getTopRatedFilms(films);
const mostCommentedFilms = getMostCommentedFilms(films);

const popupFilm = films[0];
const popupFilmComments = getCommentsByIds(comments, popupFilm.comments);
const newComment = generateNewComment();


// Поиск основных узлов для рендеринга

const bodyNode = document.body;
const headerNode = bodyNode.querySelector(`.${ClassName.HEADER}`);
const mainNode = bodyNode.querySelector(`.${ClassName.MAIN}`);
const footerNode = bodyNode.querySelector(`.${ClassName.FOOTER}`);


// Рендеринг звания пользователя в хедере

renderBeforeEnd(headerNode, createProfileTemplate(historyFilmsAmount));


// Рендеринг навигации с фильтрами

renderBeforeEnd(mainNode, createNavigationTemplate(filters, filters[0].name));


// Рендеринг основного экрана - сортировка, списки фильмов, кнопка "Show More"

renderBeforeEnd(mainNode, createSortListTemplate(SORT_TYPES, SORT_TYPES[0]));
renderBeforeEnd(mainNode, createFilmsTemplate());

const [
  mainFilmsListNode,
  topRatedFilmsListNode,
  mostCommentedFilmsListNode,
] = mainNode.querySelectorAll(`.${ClassName.FILMS_CONTAINER}`);

renderAfterEnd(mainFilmsListNode, createShowMoreButtonTemplate());

const shohMoreButtonNode = mainNode.querySelector(`.${ClassName.SHOW_MORE_BUTTON}`);

topRatedFilms
  .slice(0, EXTRA_FILMS_AMOUNT)
  .forEach((film) => renderBeforeEnd(topRatedFilmsListNode, createFilmCardTemplate(film)));

mostCommentedFilms
  .slice(0, EXTRA_FILMS_AMOUNT)
  .forEach((film) => renderBeforeEnd(mostCommentedFilmsListNode, createFilmCardTemplate(film)));


// Рендеринг статистики в футере

renderBeforeEnd(footerNode, createFooterStatisticsTemplate(allFilmsAmount));


// Рендеринг попапа для первого фильма из списка

renderBeforeEnd(bodyNode, createFilmDetailsTemplate(popupFilm));
bodyNode.classList.add(ClassName.HIDE_OVERFLOW);

const popupCommentsContainerNode = document.querySelector(`.${ClassName.COMMENTS_CONTAINER}`);

renderBeforeEnd(popupCommentsContainerNode, createCommentsListTemplate(popupFilmComments));
renderBeforeEnd(popupCommentsContainerNode, createNewCommentTemplate(newComment));


// Активация кнопки "Show More"

let renderedFilmsAmount = 0;

const onShowMoreButtonNodeClick = (evt) => {
  evt.preventDefault();

  films
    .slice(renderedFilmsAmount, renderedFilmsAmount + FILMS_STEP)
    .forEach((film) => renderBeforeEnd(mainFilmsListNode, createFilmCardTemplate(film)));

  renderedFilmsAmount += FILMS_STEP;

  if (renderedFilmsAmount >= filmsAmount) {
    shohMoreButtonNode.remove();
  }
};

shohMoreButtonNode.addEventListener('click', onShowMoreButtonNodeClick);


// Вызов клика для рендеринга первых пяти карточек фильмов

shohMoreButtonNode.click();
