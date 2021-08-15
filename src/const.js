export const ESCAPE_CODE = 'Escape';

export const FILMS_STEP = 5;

export const EXTRA_FILMS_AMOUNT = 2;

export const MAX_DESCRIPTION_LENGTH = 140;

export const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

export const Emotion = {
  SMILE: 'smile',
  SLEEPING: 'sleeping',
  PUKE: 'puke',
  ANGRY: 'angry',
};

export const Place = {
  BEFORE_END: 'beforeend',
  AFTER_BEGIN: 'afterbegin',
};

export const ClassName = {
  MAIN: 'main',
  HEADER: 'header',
  FOOTER: 'footer',
  HIDE_OVERFLOW: 'hide-overflow',
  SORT_BUTTON: 'sort__button',
  SORT_BUTTON_ACTIVE: 'sort__button--active',
  FILMS_CONTAINER: 'films-list__container',
  COMMENTS_CONTAINER: 'film-details__comments-wrap',
  SHOW_MORE_BUTTON: 'films-list__show-more',
  NAVIGATION_ITEM_ACTIVE: 'main-navigation__item--active',
  FILM_CARD_CONTROL_ACTIVE: 'film-card__controls-item--active',
  FILM_CARD_CONTROL_TO_WATCH: 'film-card__controls-item--add-to-watchlist',
  FILM_CARD_CONTROL_WATCHED: 'film-card__controls-item--mark-as-watched',
  FILM_CARD_CONTROL_FAVORITE: 'film-card__controls-item--favorite',
  FILM_DETAILS_CONTROL_TO_WATCH: 'film-details__control-button--watchlist',
  FILM_DETAILS_CONTROL_WATCHED: 'film-details__control-button--watched',
  FILM_DETAILS_CONTROL_FAVORITE: 'film-details__control-button--favorite',
  FILM_CARD_POSTER: 'film-card__poster',
  FILM_CARD_TITLE: 'film-card__title',
  FILM_CARD_COMMENTS: 'film-card__comments',
  FILM_DETAILS_CLOSE_BTN: 'film-details__close-btn',
  FILM_DETAILS_CONTROL_ACTIVE: 'film-details__control-button--active',
};

export const FilmListOption = {
  EMPTY: {
    title: 'There are no movies in our database',
  },
  MAIN: {
    title: 'All movies. Upcoming',
    isTitleVisiallyHidden: true,
    type: 'main',
  },
  TOP_RATED: {
    title: 'Top rated',
    isExtra: true,
    type: 'topRated',
  },
  MOST_COMMENTED: {
    title: 'Most commented',
    isExtra: true,
    type: 'mostCommented',
  },
};
