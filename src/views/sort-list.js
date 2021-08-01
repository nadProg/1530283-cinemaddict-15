import { ClassName } from '../const.js';

const setActiveClassName = (condition) => condition ? ClassName.SORT_ITEM_ACTIVE : '';

const createSortItemTemplate = (sortName, isChecked) => `
  <li>
    <a href="#${sortName}" class="sort__button ${setActiveClassName(isChecked)}">Sort by ${sortName}</a>
  </li>
`;

export const createSortListTemplate = (sortItems = [], activeItem) => {
  const sortItemsTemplate = sortItems.map((sortItem) => createSortItemTemplate(sortItem, sortItem === activeItem)).join('');
  return `<ul class="sort">${sortItemsTemplate}</ul>`;
};
