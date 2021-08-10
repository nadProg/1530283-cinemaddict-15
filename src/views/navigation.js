import AbstractView from './abstract.js';
import { ClassName } from '../const.js';

const setActiveClassName = (condition) => condition ? ClassName.NAVIGATION_ITEM_ACTIVE : '';

const filterNameToTextContent = {
  all: 'All movies',
  watchlist: 'Watchlist',
  history: 'History',
  favorites: 'Favorites',
};

const createFilterCountTemplate = (count) => ` <span class="main-navigation__item-count">${count}</span>`;

const createFilterTemplate = (filter, isChecked) => {
  const { name, count } = filter;
  const textContent = `${filterNameToTextContent[name]}${name !== 'all' ? createFilterCountTemplate(count) : ''}`;
  return `<a href="#${name}" class="main-navigation__item ${setActiveClassName(isChecked)}">${textContent}</a>`;
};

const createNavigationTemplate = (filters, activeItem) => {
  const isStatsChecked = activeItem === 'stats';
  const filtersTemplate = filters.map((filter) => createFilterTemplate(filter, filter.name === activeItem)).join('');
  return `
    <nav class="main-navigation">
      <div class="main-navigation__items">
        ${filtersTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional ${setActiveClassName(isStatsChecked)}">Stats</a>
    </nav>
  `;
};

export default class Navigation extends AbstractView {
  constructor(filters = [], activeItem) {
    super();

    this._filters = filters;
    this._activeItem = activeItem;
  }

  getTemplate() {
    return createNavigationTemplate(this._filters, this._activeItem);
  }
}
