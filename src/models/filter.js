import { FilterType } from '../const.js';

import AbstractObserver from '../utils/abstract-observer.js';

export default class FilterModel extends AbstractObserver {
  constructor() {
    super();
    this._activeFilter = FilterType.ALL;
  }

  forceUpdate(updateType) {
    this._notify(updateType, this.getFilter());
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}
