import { replace } from '../utils/render.js';

import AbstractView from './abstract.js';

export default class SmartView extends AbstractView {
  constructor() {
    super();

    this._data = {};
  }

  updateData(updatedData, { isElementUpdate = false } = {}) {
    if (!updatedData) {
      return;
    }

    this._data = {
      ...this._data,
      ...updatedData,
    };

    if (isElementUpdate) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    const prevElement = this.getElement();
    this.removeElement();
    replace(this.getElement(), prevElement);
    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }
}
