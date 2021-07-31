import { createProfileTemplate } from './views/profile.js';
import { createNavigationTemplate } from './views/navigation.js';
import { createSortTemplate } from './views/sort.js';
import { createFilmsTemplate } from './views/films.js';
import { createFilmCardTemplate } from './views/film-card.js';
import { createShowMoreButtonTemplate } from './views/show-more-button.js';
import { createFooterStatisticsTemplate } from './views/footer-statistics.js';
import { createFilmDetailsTemplate } from './views/film-details.js';

import { generateFilm } from './mock/film.js';
import { generateFilters, getFilterCount } from './mock/filters.js';
import { generateComment, getCommentsFromIds } from './mock/comment.js';
import { getRandomInteger } from './utils.js';

const HIDE_OVERFLOW_CLASS = 'hide-overflow';

const COMMENTS_AMOUNT = 100;
const MAIN_FILMS_AMOUNT = getRandomInteger(15, 25);
const EXTRA_FILMS_AMOUNT = 2;
const MAIN_FILMS_STEP = 5;

const BEFORE_END = 'beforeend';
const AFTER_END = 'afterend';

const comments = new Array(COMMENTS_AMOUNT).fill().map((item, index) => generateComment(index + 1));
const films = new Array(MAIN_FILMS_AMOUNT).fill().map((item, index) => generateFilm(index + 1));
const filters = generateFilters(films);

console.log(films);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const bodyNode = document.body;
const headerNode = bodyNode.querySelector('.header');
const mainNode = bodyNode.querySelector('.main');
const footerNode = bodyNode.querySelector('.footer');

render(headerNode, createProfileTemplate(getFilterCount(filters, 'history')), BEFORE_END);

render(mainNode, createNavigationTemplate(filters), BEFORE_END);
render(mainNode, createSortTemplate(), BEFORE_END);
render(mainNode, createFilmsTemplate(), BEFORE_END);

const [
  mainFilmsListNode,
  topRatedFilmsListNode,
  mostCommentedFilmsListNode,
] = mainNode.querySelectorAll('.films-list__container');

for (let i = 0; i < MAIN_FILMS_STEP; i++) {
  render(mainFilmsListNode, createFilmCardTemplate(films[i]), BEFORE_END);
}

render(mainFilmsListNode, createShowMoreButtonTemplate(), AFTER_END);

const topRatedFilms = [...films].sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
const mostCommentedFilms = [...films].sort((a, b) => b.comments.length - a.comments.length);

topRatedFilms
  .slice(0, EXTRA_FILMS_AMOUNT)
  .forEach((film) => render(topRatedFilmsListNode, createFilmCardTemplate(film), BEFORE_END));

mostCommentedFilms
  .slice(0, EXTRA_FILMS_AMOUNT)
  .forEach((film) => render(mostCommentedFilmsListNode, createFilmCardTemplate(film), BEFORE_END));

render(footerNode, createFooterStatisticsTemplate(getFilterCount(filters, 'all')), BEFORE_END);

// render(bodyNode, createFilmDetailsTemplate(films[0], getCommentsFromIds(comments, films[0].comments)), BEFORE_END);
// bodyNode.classList.add(HIDE_OVERFLOW_CLASS);
