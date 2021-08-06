import { createElement } from '../utils.js';
import { ClassName } from '../const.js';

const setActiveClassName = (condition) => condition ? ClassName.SORT_ITEM_ACTIVE : '';

const createSortItemTemplate = (sortType, isChecked) => `
  <li>
    <a href="#${sortType}" class="sort__button ${setActiveClassName(isChecked)}">Sort by ${sortType}</a>
  </li>
`;

export const createSortBarTemplate = (sortTypes = [], activeSortType) => {
  const sortItemsTemplate = sortTypes.map((sortType) => createSortItemTemplate(sortType, sortType === activeSortType)).join('');
  return `<ul class="sort">${sortItemsTemplate}</ul>`;
};

export default class SortBar {
  constructor(types, activeType) {
    this._types = types;
    this._activeType = activeType;

    this._element = null;
  }

  getTemplate() {
    return createSortBarTemplate(this._types, this._activeType);
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
