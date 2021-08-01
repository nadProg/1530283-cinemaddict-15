import { ClassName } from '../const.js';

const setActiveClassName = (condition) => condition ? ClassName.SORT_ITEM_ACTIVE : '';

const createSortItemTemplate = (sortType, isChecked) => `
  <li>
    <a href="#${sortType}" class="sort__button ${setActiveClassName(isChecked)}">Sort by ${sortType}</a>
  </li>
`;

export const createSortListTemplate = (sortTypes = [], activeSortType) => {
  const sortItemsTemplate = sortTypes.map((sortType) => createSortItemTemplate(sortType, sortType === activeSortType)).join('');
  return `<ul class="sort">${sortItemsTemplate}</ul>`;
};
