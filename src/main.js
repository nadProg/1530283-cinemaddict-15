import { createProfileTemplate } from './views/profile.js';
import { createNavigationTemplate } from './views/navigation.js';
import { createSortTemplate } from './views/sort.js';
import { createFilmsTemplate } from './views/films.js';
import { createFilmCardTemplate } from './views/film-card.js';
import { createShowMoreButtonTemplate } from './views/show-more-button.js';
import { createStatisticsTemplate } from './views/statistics.js';
import { createFilmDetailsTemplate } from './views/film-details.js';

const HIDE_OVERFLOW = 'hide-overflow';

const MAIN_FILMS_AMOUNT = 5;
const EXTRA_FILMS_AMOUNT = 2;

const BEFOREEND = 'beforeend';
const AFTEREND = 'afterend';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const bodyNode = document.body;
const headerNode = bodyNode.querySelector('.header');
const mainNode = bodyNode.querySelector('.main');
const footerNode = bodyNode.querySelector('.footer');

render(headerNode, createProfileTemplate(), BEFOREEND);

render(mainNode, createNavigationTemplate(), BEFOREEND);
render(mainNode, createSortTemplate(), BEFOREEND);
render(mainNode, createFilmsTemplate(), BEFOREEND);

const [
  mainFilmsListNode,
  topRatedFilmsListNode,
  mostCommentedFilmsListNode,
] = mainNode.querySelectorAll('.films-list__container');

for (let i = 0; i < MAIN_FILMS_AMOUNT; i++) {
  render(mainFilmsListNode, createFilmCardTemplate(), BEFOREEND);
}

render(mainFilmsListNode, createShowMoreButtonTemplate(), AFTEREND);

for (let i = 0; i < EXTRA_FILMS_AMOUNT; i++) {
  render(topRatedFilmsListNode, createFilmCardTemplate(), BEFOREEND);
}

for (let i = 0; i < EXTRA_FILMS_AMOUNT; i++) {
  render(mostCommentedFilmsListNode, createFilmCardTemplate(), BEFOREEND);
}

render(footerNode, createStatisticsTemplate(), BEFOREEND);

render(bodyNode, createFilmDetailsTemplate(), BEFOREEND);
bodyNode.classList.add(HIDE_OVERFLOW);
