import AbstractView from './abstract.js';

const createFilmsListTemplate = ({ title, isExtra, isTitleVisiallyHidden }) => `
    <section class="films-list ${isExtra ? 'films-list--extra' : ''}">
      <h2 class="films-list__title ${isTitleVisiallyHidden ? 'visually-hidden' : ''}">${title}</h2>
    </section>
  `;

export default class FilmsList extends AbstractView {
  constructor(options) {
    super();

    this._options = options;
  }

  getTemplate() {
    return createFilmsListTemplate(this._options);
  }
}
