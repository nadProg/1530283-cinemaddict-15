import AbstractView from './abstract.js';

export const createMainTemplate = () => '<main class="main"></main>';

export default class MainView extends AbstractView {
  getTemplate() {
    return createMainTemplate();
  }
}
