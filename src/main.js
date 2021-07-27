import { createProfileTemplate } from './views/profile.js';
import { createNavigationTemplate } from './views/navigation.js';
import { createSortTemplate } from './views/sort.js';
import { createfilmCard } from './views/film-card.js';

const BEFOREEND = 'beforeend';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const headerNode = document.body.querySelector('.header');
const mainNode = document.body.querySelector('.main');

render(headerNode, createProfileTemplate(), BEFOREEND);

render(mainNode, createNavigationTemplate(), BEFOREEND);
render(mainNode, createSortTemplate(), BEFOREEND);
