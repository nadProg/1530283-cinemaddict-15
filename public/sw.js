const CACHE_PREFIX = 'cinemaddict-cache';
const CACHE_VER = 'v15';
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VER}`;

const HTTP_STATUS_OK = 200;
const RESPONSE_SAFE_TYPE = 'basic';

const CACHE_PATHS = [
  '/',
  '/index.html',
  '/bundle.js',
  '/css/normalize.css',
  '/css/main.css',
  '/fonts/OpenSans-Bold.woff2',
  '/fonts/OpenSans-ExtraBold.woff2',
  '/fonts/OpenSans-Regular.woff2',
  '/images/background.png',
  '/images/bitmap.png',
  '/images/bitmap@2x.png',
  '/images/bitmap@3x.png',
  '/images/emoji/angry.png',
  '/images/emoji/puke.png',
  '/images/emoji/sleeping.png',
  '/images/emoji/smile.png',
  '/images/icons/icon-favorite-active.svg',
  '/images/icons/icon-favorite.svg',
  '/images/icons/icon-watched-active.svg',
  '/images/icons/icon-watched.svg',
  '/images/icons/icon-watchlist-active.svg',
  '/images/icons/icon-watchlist.svg',
  '/images/posters/made-for-each-other.png',
  '/images/posters/popeye-meets-sinbad.png',
  '/images/posters/sagebrush-trail.jpg',
  '/images/posters/santa-claus-conquers-the-martians.jpg',
  '/images/posters/the-dance-of-life.jpg',
  '/images/posters/the-great-flamarion.jpg',
  '/images/posters/the-man-with-the-golden-arm.jpg',
];
const IGNORE_CACHE_PATH = 'sockjs-node';

const handleCacheKey = (key) => {
  if (key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME) {
    return caches.delete(key);
  }

  return null;
};

const isNotNull = (key) => key !== null;

const createCache = async () => {
  const cache = await caches.open(CACHE_NAME);
  return await cache.addAll(CACHE_PATHS);
};

const updateCache = async () => {
  const keys = await caches.keys();
  return await Promise.all(keys.map(handleCacheKey).filter(isNotNull));
};

const fetchAndCache = async (request) => {
  const response = await fetch(request);

  if (!response ||
    response.status !== HTTP_STATUS_OK ||
    response.type !== RESPONSE_SAFE_TYPE) {
    return response;
  }

  const clonedResponse = response.clone();
  const cache = caches.open(CACHE_NAME);
  await cache.put(request, clonedResponse);

  return response;
};

const respondWithCache = async (request) => {
  const cachedResponse = await caches.match(request);
  return cachedResponse ? cachedResponse : fetchAndCache(request);
};

self.addEventListener('install', (evt) => evt.waitUntil(createCache()));

self.addEventListener('activate', (evt) => evt.waitUntil(updateCache()));

self.addEventListener('fetch', (evt) => {
  const { request } = evt;

  if (request.url.includes(IGNORE_CACHE_PATH)) {
    return;
  }

  evt.respondWith(respondWithCache(request));
});
