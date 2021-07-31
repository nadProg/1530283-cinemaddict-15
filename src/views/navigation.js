const NAVIGATION_ITEM_ACTIVE_CLASSNAME = 'main-navigation__item--active';

const filterNameToTextContent = {
  all: 'All movies',
  watchlist: 'Watchlist',
  history: 'History',
  favorites: 'Favorites',
};

const createFilterCountTemplate = (count) => ` <span class="main-navigation__item-count">${count}</span>`;

const createFiltersTemplate = (filter, isChecked) => {
  const { name, count } = filter;
  const textContent = `${filterNameToTextContent[name]}${name !== 'all' ? createFilterCountTemplate(count) : ''}`;
  return `<a href="#${name}" class="main-navigation__item ${isChecked ? NAVIGATION_ITEM_ACTIVE_CLASSNAME : ''}">${textContent}</a>`;
};

export const createNavigationTemplate = (filters = [], isStatsChecked) => {
  const filtersTemplate = filters.map((filter, index) => createFiltersTemplate(filter, !index)).join('');
  return `
    <nav class="main-navigation">
      <div class="main-navigation__items">
        ${filtersTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional ${isStatsChecked ? NAVIGATION_ITEM_ACTIVE_CLASSNAME : ''}">Stats</a>
    </nav>
  `;
};
