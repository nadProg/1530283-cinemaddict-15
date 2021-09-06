import { END_POINT, AUTHORIZATION, STORE_NAME, OFFLINE_POSTFIX } from './const.js';
import { isOnline } from './utils/common.js';
import { alert, AlertType } from './utils/alert.js';

import ApplicationPresenter from './presenters/application.js';

import Api from './api/api.js';
import Store from './api/store.js';
import Provider from './api/provider.js';

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const provider = new Provider(api, store);

const applicationPresenter = new ApplicationPresenter(document.body, provider);

const onWindowOffline = () => {
  document.title += OFFLINE_POSTFIX;
  alert('Offline mode');
};

if (!isOnline()) {
  onWindowOffline();
}

applicationPresenter.init();

window.addEventListener('online', () => {
  document.title = document.title.replace(OFFLINE_POSTFIX, '');
  alert('Online mode', {type: AlertType.SUCCESS});
  provider.sync();
});

window.addEventListener('offline', onWindowOffline);

window.addEventListener('load', () => {
  navigator.serviceWorker.register('/sw.js');
});
