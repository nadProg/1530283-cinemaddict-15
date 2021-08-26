
import { render, replace } from '../utils/render.js';
import { FilterType, UpdateType, Screen } from '../const.js';
import { filter } from '../utils/film.js';
import NavigationView from '../views/navigation.js';

export default class NavigationPresenter {
  constructor(navigationContainer, filterModel, filmsModel, renderScreen) {
    this._navigationContainer = navigationContainer;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._renderScreen = renderScreen;

    this._activeItem = FilterType.ALL;

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
    this._navigationView.setStatisticClickHandler(this._handleStatisticClick);

    if (prevNavigationView) {
      replace(this._navigationView, prevNavigationView);
    } else {
      render(this._navigationContainer, this._navigationView);
    }
  }

  _getFilters() {
    const films = this._filmsModel.getAll();

    return [
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

  _handleFilterChange(filterType) {
    if (this._filterModel.getFilter() === filterType) {
      return;
    }

    this._activeItem = filterType;
    this._filterModel.setFilter(UpdateType.MAJOR, filterType);

    this._renderScreen(Screen.FILMS);
  }

  _handleStatisticClick() {
    this._renderScreen(Screen.STATISTIC);
  }

  _handleModelEvent(updateType) {
    if (updateType !== UpdateType.PATCH) {
      this.init();
    }
  }
}
