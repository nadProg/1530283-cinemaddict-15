import AbstractView from './abstract.js';

export const createFooterTemplate = () => `
  <footer class="footer">
    <section class="footer__logo logo logo--smaller">Cinemaddict</section>
  </footer>
`;

export default class FooterView extends AbstractView {
  getTemplate() {
    return createFooterTemplate();
  }
}
