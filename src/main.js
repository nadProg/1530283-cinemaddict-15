import { createProfileTemplate } from './views/profile.js';
import { createNavigationTemplate } from './views/navigation.js';
import { createSortTemplate } from './views/sort.js';
import { createFilmCardTemplate } from './views/film-card.js';
import { createFilmsListTemplate } from './views/films.js';
import { createFilmsListExtraTemplate } from './views/films-extra.js';
import { createStatisticsTemplate } from './views/statistics.js';

const AFTERBEGIN = 'afterbegin';
const BEFOREEND = 'beforeend';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const headerNode = document.body.querySelector('.header');
const mainNode = document.body.querySelector('.main');
const filmsNode = document.body.querySelector('.films');
const footerNode = document.body.querySelector('.footer');

render(headerNode, createProfileTemplate(), BEFOREEND);

render(mainNode, createNavigationTemplate(), AFTERBEGIN);
render(mainNode, createSortTemplate(), AFTERBEGIN);

render(filmsNode, createFilmsListTemplate(), BEFOREEND);
render(filmsNode, createFilmsListExtraTemplate('Top rated'), BEFOREEND);
render(filmsNode, createFilmsListExtraTemplate('Most commented'), BEFOREEND);

render(footerNode, createStatisticsTemplate(), BEFOREEND);


// for (let i = 0; i < 5; i++) {
//   render(filmsNode, createFilmCardTemplate(), BEFOREEND);
// }
