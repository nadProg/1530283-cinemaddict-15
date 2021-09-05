import { END_POINT, AUTHORIZATION, STORE_NAME } from './const.js';

import ApplicationPresenter from './presenters/application.js';

import Api from './api/api.js';
import Store from './api/store.js';
import Provider from './api/provider.js';

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const provider = new Provider(api, store);

const applicationPresenter = new ApplicationPresenter(document.body, provider);

applicationPresenter.init();

window.addEventListener('load', () => {
  navigator.serviceWorker.register('/sw.js');
});

window.addEventListener('online', () => {
  document.title = document.title.replace(' [offline]', '');
  provider.sync();
});

window.addEventListener('offline', () => {
  document.title += ' [offline]';
});
