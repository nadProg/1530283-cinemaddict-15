import AbstractView from './abstract.js';
import { ClassName, SortType } from '../const.js';

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
  constructor(activeSortType = SortType.DEFAULT) {
    super();

    this._activeSortType = activeSortType;
  }

  getTemplate() {
    return createSortBarTemplate(this._activeSortType);
  }
}
