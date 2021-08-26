export const KeyCode = {
  ENTER: 'Enter',
  ESCAPE: 'Escape',
};

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
  COMMENT: 'film-details__comment',
  COMMENT_DELETE_BUTTON: 'film-details__comment-delete',
  SHOW_MORE_BUTTON: 'films-list__show-more',
  NAVIGATION_FILTER_ITEM: 'main-navigation__items',
  NAVIGATION_STATISTICS_ITEM: 'main-navigation__additional',
  NAVIGATION_ITEM: 'main-navigation__item',
  NAVIGATION_ITEM_ACTIVE: 'main-navigation__item--active',
  FILM_CARD_CONTROL_ACTIVE: 'film-card__controls-item--active',
  FILM_CARD_CONTROL_TO_WATCH: 'film-card__controls-item--add-to-watchlist',
  FILM_CARD_CONTROL_WATCHED: 'film-card__controls-item--mark-as-watched',
  FILM_CARD_CONTROL_FAVORITE: 'film-card__controls-item--favorite',
  FILM_DETAILS_CONTROL_TO_WATCH: 'film-details__control-button--watchlist',
  FILM_DETAILS_CONTROL_WATCHED: 'film-details__control-button--watched',
  FILM_DETAILS_CONTROL_FAVORITE: 'film-details__control-button--favorite',
  FILM_DETAILS_EMOJI_ITEM: 'film-details__emoji-item',
  FILM_DETAILS_EMOJI_LIST: 'film-details__emoji-list',
  FILM_DETAILS_TEXTAREA: 'film-details__comment-input',
  FILM_CARD_POSTER: 'film-card__poster',
  FILM_CARD_TITLE: 'film-card__title',
  FILM_CARD_COMMENTS: 'film-card__comments',
  FILM_DETAILS_CLOSE_BTN: 'film-details__close-btn',
  FILM_DETAILS_CONTROL_ACTIVE: 'film-details__control-button--active',
};

export const FilmsListOption = {
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

export const NEW_COMMENT_DEFAULT = {
  text: '',
  emotion: '',
};

export const FilterType = {
  ALL: 'ALL',
  WATCHLIST: 'WATCHLIST',
  HISTORY: 'HISTORY',
  FAVORITES: 'FAVORITES',
};

export const NavigationItem = {
  ...FilterType,
  STATISTIC: 'STATISTIC',
};

export const filterTypeToEmptyTitle = {
  ALL: 'There are no movies in our database',
  WATCHLIST: 'There ara no movies to watch now',
  HISTORY: 'There ara no watched movies now',
  FAVORITES: 'There ara no favorite movies now',
};

export const UserAction = {
  CREATE_COMMENT: 'CREATE_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
  UPDATE_FILM_USER_DETAILS: 'UPDATE_FILM_USER_DETAILS',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export const Screen = {
  FILMS: 'FILMS',
  STATISTIC: 'STATISTIC',
};

export const Rank = {
  NONE: 'NONE',
  NOVICE: 'NOVICE',
  FAN: 'FAN',
  MOVIE_BUFF: 'MOVIE_BUFF',
};
