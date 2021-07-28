import { createProfileTemplate } from './views/profile.js';
import { createNavigationTemplate } from './views/navigation.js';
import { createSortTemplate } from './views/sort.js';
import { createFilmCardTemplate } from './views/film-card.js';
import { createFilmsTemplate } from './views/films.js';
import { createStatisticsTemplate } from './views/statistics.js';

const MAIN_FILMS_AMOUNT = 5;
const EXTRA_FILMS_AMOUNT = 2;

const AFTERBEGIN = 'afterbegin';
const BEFOREEND = 'beforeend';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const headerNode = document.body.querySelector('.header');
const mainNode = document.body.querySelector('.main');
const footerNode = document.body.querySelector('.footer');

render(headerNode, createProfileTemplate(), BEFOREEND);

render(mainNode, createNavigationTemplate(), BEFOREEND);
render(mainNode, createSortTemplate(), BEFOREEND);
render(mainNode, createFilmsTemplate(), BEFOREEND);

const [
  mainFilmsListNode,
  topRatedFilmsListNode,
  mostCommentedFilmsListNode,
] = mainNode.querySelectorAll('.films-list__container');

console.log(mainFilmsListNode);
console.log(topRatedFilmsListNode);
console.log(mostCommentedFilmsListNode);

render(footerNode, createStatisticsTemplate(), BEFOREEND);


// for (let i = 0; i < 5; i++) {
//   render(filmsNode, createFilmCardTemplate(), BEFOREEND);
// }
