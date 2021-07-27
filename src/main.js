import { createProfileTemplate } from './views/profile.js';

const BEFOREEND = 'beforeend';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const headerNode = document.body.querySelector('.header');

render(headerNode, createProfileTemplate(), BEFOREEND);
