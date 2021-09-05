import { END_POINT, AUTHORIZATION } from './const';

import ApplicationPresenter from './presenters/application';

import Api from './api/api.js';
import Store from './api/store.js';
import Provider from './api/provider.js';

const STORE_PREFIX = 'cinemaddict-localstorage';
const STORE_VER = 'v15';
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const provider = new Provider(api, store);

const applicationPresenter = new ApplicationPresenter(document.body, provider);

applicationPresenter.init();

window.addEventListener('online', () => {
  document.title = document.title.replace(' [offline]', '');
  // provider.sync();
});

window.addEventListener('offline', () => {
  document.title += ' [offline]';
});
