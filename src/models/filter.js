import { FilterType } from '../const.js';

import AbstractObserver from '../utils/abstract-observer.js';

export default class FilterModel extends AbstractObserver {
  constructor() {
    super();
    this._filter = FilterType.ALL;
  }

  setFilter(updateType, filter) {
    this._filter = filter;
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._filter;
  }
}
