import { generateFilm } from './mock/film.js';
import { generateComment, getCommentsByIds } from './mock/comment.js';
import { generateFilters, getFilterCountByName } from './mock/filters.js';
import { ClassName, COMMENTS_AMOUNT, EXTRA_FILMS_AMOUNT, FILMS_STEP, SORT_NAMES } from './const.js';
import { getRandomInteger, renderAfterEnd, renderBeforeEnd, sortFilmsByRating, sortFilmsByComments } from './utils.js';
import { createProfileTemplate } from './views/profile.js';
import { createNavigationTemplate } from './views/navigation.js';
import { createSortListTemplate } from './views/sort-list.js';
import { createFilmsTemplate } from './views/films.js';
import { createFilmCardTemplate } from './views/film-card.js';
import { createShowMoreButtonTemplate } from './views/show-more-button.js';
import { createFooterStatisticsTemplate } from './views/footer-statistics.js';
import { createFilmDetailsTemplate } from './views/film-details.js';

const filmsAmount = getRandomInteger(15, 25);

let renderedFilmsAmount = 0;

const films = new Array(filmsAmount).fill().map((item, index) => generateFilm(index + 1));
const comments = new Array(COMMENTS_AMOUNT).fill().map((item, index) => generateComment(index + 1));

const filters = generateFilters(films);
const allFilmsAmount = getFilterCountByName(filters, 'all');
const historyFilmsAmount = getFilterCountByName(filters, 'history');

const topRatedFilms = sortFilmsByRating(films);
const mostCommentedFilms = sortFilmsByComments(films);

const popupFilm = films[0];
const popupFilmComments = getCommentsByIds(comments, popupFilm.comments);

console.log(films, comments, filters);

const bodyNode = document.body;
const headerNode = bodyNode.querySelector('.header');
const mainNode = bodyNode.querySelector('.main');
const footerNode = bodyNode.querySelector('.footer');

renderBeforeEnd(headerNode, createProfileTemplate(historyFilmsAmount));

renderBeforeEnd(mainNode, createNavigationTemplate(filters, filters[0].name));
renderBeforeEnd(mainNode, createSortListTemplate(SORT_NAMES, SORT_NAMES[0]));
renderBeforeEnd(mainNode, createFilmsTemplate());

const [
  mainFilmsListNode,
  topRatedFilmsListNode,
  mostCommentedFilmsListNode,
] = mainNode.querySelectorAll('.films-list__container');

renderAfterEnd(mainFilmsListNode, createShowMoreButtonTemplate());

const shohMoreButtonNode = mainNode.querySelector('.films-list__show-more');

topRatedFilms
  .slice(0, EXTRA_FILMS_AMOUNT)
  .forEach((film) => renderBeforeEnd(topRatedFilmsListNode, createFilmCardTemplate(film)));

mostCommentedFilms
  .slice(0, EXTRA_FILMS_AMOUNT)
  .forEach((film) => renderBeforeEnd(mostCommentedFilmsListNode, createFilmCardTemplate(film)));

renderBeforeEnd(footerNode, createFooterStatisticsTemplate(allFilmsAmount));

// renderBeforeEnd(bodyNode, createFilmDetailsTemplate(popupFilm, popupFilmComments));
// bodyNode.classList.add(ClassName.HIDE_OVERFLOW);

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
shohMoreButtonNode.click();
