import AbstractView from './abstract.js';
import { ClassName } from '../const.js';

const setActiveClassName = (condition) => condition ? ClassName.SORT_ITEM_ACTIVE : '';

const createSortItemTemplate = (sortType, isChecked) => `
  <li>
    <a href="#${sortType}" class="sort__button ${setActiveClassName(isChecked)}">Sort by ${sortType}</a>
  </li>
`;

export const createSortBarTemplate = (sortItems = [], activeSortItem) => {
  const sortItemsTemplate = sortItems.map((sortItem) => createSortItemTemplate(sortItem, sortItem === activeSortItem)).join('');
  return `<ul class="sort">${sortItemsTemplate}</ul>`;
};

export default class SortBarView extends AbstractView {
  constructor(items, activeItem) {
    super();

    this._items = items;
    this._activeItem = activeItem;
  }

  getTemplate() {
    return createSortBarTemplate(this._items, this._activeItem);
  }
}
