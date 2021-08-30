import AbstractView from './abstract.js';

const createEmptyBoardTemplate = (message) => `
  <section class="films">
    <section class="films-list">
      <h2 class="films-list__title">${message}</h2>
    </section>
  </section>
`;

export default class EmptyBoardView extends AbstractView {
  constructor(message) {
    super();

    this._message = message;
  }

  getTemplate() {
    return createEmptyBoardTemplate(this._message);
  }
}
