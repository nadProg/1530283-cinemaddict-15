import { createElement } from '../utils.js';
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

export default class Navigation {
  constructor(filters = [], activeItem) {
    this._filters = filters;
    this._activeItem = activeItem,

    this._element = null;
  }

  getTemplate() {
    return createNavigationTemplate(this._filters, this._activeItem);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
