import { ClassName, SortType } from '../const.js';

import AbstractView from './abstract.js';

const setActiveClassName = (condition) => condition ? ClassName.SORT_BUTTON_ACTIVE : '';

const createSortItemTemplate = (sortType, isChecked) => `
  <li>
    <a href="#${sortType}" class="sort__button ${setActiveClassName(isChecked)}" data-sort-type="${sortType}">
      Sort by ${sortType}
    </a>
  </li>
`;

export const createSortBarTemplate = (activeSortType) => {
  const sortItemsTemplate = Object.values(SortType).map((sortType) => createSortItemTemplate(sortType, sortType === activeSortType)).join('');
  return `<ul class="sort">${sortItemsTemplate}</ul>`;
};

export default class SortBarView extends AbstractView {
  constructor(activeSortType) {
    super();

    this._activeSortType = activeSortType;

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortBarTemplate(this._activeSortType);
  }

  _sortTypeChangeHandler(evt) {
    const button = evt.target.closest(`.${ClassName.SORT_BUTTON}`);

    if (!button || !evt.currentTarget.contains(button)) {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(button.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}
