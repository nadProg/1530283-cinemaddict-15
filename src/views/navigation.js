import { ClassName, FilterType, NavigationItem } from '../const.js';

import AbstractView from './abstract.js';

const setActiveClassName = (condition) => condition ? ClassName.NAVIGATION_ITEM_ACTIVE : '';

const createFilterCountTemplate = (count) => ` <span class="main-navigation__item-count">${count}</span>`;

const createFilterTemplate = (filter, isChecked) => {
  const { type, name, count } = filter;
  const textContent = `${name}${type !== FilterType.ALL ? createFilterCountTemplate(count) : ''}`;
  return `<a href="#${type}" class="main-navigation__item ${setActiveClassName(isChecked)}" data-type="${type}">${textContent}</a>`;
};

const createNavigationTemplate = (filters, activeItem) => {
  const isStatsChecked = activeItem === NavigationItem.STATISTICS;
  const filtersTemplate = filters.map((filter) => createFilterTemplate(filter, filter.type === activeItem)).join('');
  return `
    <nav class="main-navigation">
      <div class="main-navigation__items">
        ${filtersTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional ${setActiveClassName(isStatsChecked)}">Stats</a>
    </nav>
  `;
};

export default class NavigationView extends AbstractView {
  constructor(filters = [], activeItem) {
    super();

    this._filters = filters;
    this._activeItem = activeItem;

    this._filterChangeHandler = this._filterChangeHandler.bind(this);
    this._statisticClickHandler = this._statisticClickHandler.bind(this);
  }

  getTemplate() {
    return createNavigationTemplate(this._filters, this._activeItem);
  }

  _filterChangeHandler(evt) {
    const filterItem = evt.target.closest(`.${ClassName.NAVIGATION_ITEM}`);
    if (!filterItem || !evt.currentTarget.contains(filterItem)) {
      return;
    }

    evt.preventDefault();

    this._callback.filterChange(filterItem.dataset.type);
  }

  _statisticClickHandler(evt) {
    evt.preventDefault();
    this._callback.statisticClick();
  }

  setFilterChangeHandler(callback) {
    this._callback.filterChange = callback;
    this.getElement().querySelector(`.${ClassName.NAVIGATION_FILTER_ITEM}`).addEventListener('click', this._filterChangeHandler);
  }

  setStatisticClickHandler(callback) {
    this._callback.statisticClick = callback;
    this.getElement().querySelector(`.${ClassName.NAVIGATION_STATISTICS_ITEM}`).addEventListener('click', this._statisticClickHandler);
  }
}
