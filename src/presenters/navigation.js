
import { FilterType, UpdateType, Screen, NavigationItem } from '../const.js';
import { rerender } from '../utils/render.js';
import { filter } from '../utils/film.js';

import NavigationView from '../views/navigation.js';

export default class NavigationPresenter {
  constructor({ container, filterModel, filmsModel, renderScreen }) {
    this._navigationContainer = container;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._renderScreen = renderScreen;

    this._activeItem = FilterType.ALL;

    this._navigationView = null;

    this._handleFilterChange = this._handleFilterChange.bind(this);
    this._handleStatisticClick = this._handleStatisticClick.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const prevNavigationView = this._navigationView;

    this._navigationView = new NavigationView(this._getFilters(), this._activeItem);

    this._navigationView.setFilterChangeHandler(this._handleFilterChange);
    this._navigationView.setStatisticsClickHandler(this._handleStatisticClick);

    rerender(this._navigationView, prevNavigationView, this._navigationContainer);
  }

  setActiveItem(activeItem) {
    this._activeItem = activeItem;
  }

  _getFilters() {
    const films = this._filmsModel.getAll();

    if (!this._filters) {
      this._filters = [
        {
          type: FilterType.ALL,
          name: 'All movies',
          count: filter[FilterType.ALL](films).length,
        },
        {
          type: FilterType.WATCHLIST,
          name: 'Watchlist',
          count: filter[FilterType.WATCHLIST](films).length,
        },
        {
          type: FilterType.HISTORY,
          name: 'History',
          count: filter[FilterType.HISTORY](films).length,
        },
        {
          type: FilterType.FAVORITES,
          name: 'Favorites',
          count: filter[FilterType.FAVORITES](films).length,
        },
      ];
    }

    return this._filters;
  }

  _resetFilters() {
    this._filters = null;
  }

  _handleFilterChange(filterType) {
    if (this._activeItem === filterType) {
      return;
    }

    this._activeItem = filterType;
    this._filterModel.setFilter(UpdateType.MAJOR, filterType);

    this._renderScreen(Screen.FILMS);
  }

  _handleStatisticClick() {
    this._activeItem = NavigationItem.STATISTICS;
    this.init();
    this._renderScreen(Screen.STATISTICS);
  }

  _handleModelEvent(updateType) {
    if (updateType === UpdateType.PATCH) {
      return;
    }

    if (updateType === UpdateType.INIT || updateType === UpdateType.MINOR) {
      this._resetFilters();
    }

    this.init();
  }
}
