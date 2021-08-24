import { sortByRating, sortByComments, hasComments, hasRating } from '../utils/film.js';
import AbstractObserver from '../utils/abstract-observer.js';
import { updateItem } from '../utils/common.js';

export default class FilmsModel extends AbstractObserver{
  constructor(films) {
    super();
    this._films = films;
  }

  getAll() {
    return this._films;
  }

  getTopRated() {
    return [...this._films]
      .filter(hasRating)
      .sort(sortByRating);
  }

  getMostCommented() {
    return [...this._films]
      .filter(hasComments)
      .sort(sortByComments);
  }

  update(updateType, updatedItem) {
    this._films = updateItem(this._films, updatedItem);
    this._notify(updateType, updatedItem);
  }
}
