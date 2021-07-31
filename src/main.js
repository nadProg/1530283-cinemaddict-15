import { createProfileTemplate } from './views/profile.js';
import { createNavigationTemplate } from './views/navigation.js';
import { createSortTemplate } from './views/sort.js';
import { createFilmsTemplate } from './views/films.js';
import { createFilmCardTemplate } from './views/film-card.js';
import { createShowMoreButtonTemplate } from './views/show-more-button.js';
import { createStatisticsTemplate } from './views/statistics.js';
import { createFilmDetailsTemplate } from './views/film-details.js';

import { generateFilm } from './mock/film.js';

const HIDE_OVERFLOW_CLASS = 'hide-overflow';

const MAIN_FILMS_AMOUNT = 5;
const EXTRA_FILMS_AMOUNT = 2;

const BEFORE_END = 'beforeend';
const AFTER_END = 'afterend';

const films = new Array(MAIN_FILMS_AMOUNT).fill().map((item, index) => generateFilm(index + 1));

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const bodyNode = document.body;
const headerNode = bodyNode.querySelector('.header');
const mainNode = bodyNode.querySelector('.main');
const footerNode = bodyNode.querySelector('.footer');

render(headerNode, createProfileTemplate(), BEFORE_END);

render(mainNode, createNavigationTemplate(), BEFORE_END);
render(mainNode, createSortTemplate(), BEFORE_END);
render(mainNode, createFilmsTemplate(), BEFORE_END);

const [
  mainFilmsListNode,
  topRatedFilmsListNode,
  mostCommentedFilmsListNode,
] = mainNode.querySelectorAll('.films-list__container');

for (let i = 0; i < MAIN_FILMS_AMOUNT; i++) {
  render(mainFilmsListNode, createFilmCardTemplate(films[i]), BEFORE_END);
}

render(mainFilmsListNode, createShowMoreButtonTemplate(), AFTER_END);

for (let i = 0; i < EXTRA_FILMS_AMOUNT; i++) {
  render(topRatedFilmsListNode, createFilmCardTemplate(films[i]), BEFORE_END);
}

for (let i = 0; i < EXTRA_FILMS_AMOUNT; i++) {
  render(mostCommentedFilmsListNode, createFilmCardTemplate(films[i]), BEFORE_END);
}

render(footerNode, createStatisticsTemplate(), BEFORE_END);

// render(bodyNode, createFilmDetailsTemplate(), BEFORE_END);
// bodyNode.classList.add(HIDE_OVERFLOW_CLASS);
