import { getFullYear, getRuntime } from '../utils.js';

const MAX_DESCRIPTION_LENGTH = 140;
const CONTROLS_ITEM_ACTIVE_CLASSNAME = 'film-card__controls-item--active';

const trimDescription = (description) => description.length <= MAX_DESCRIPTION_LENGTH ?
  description : `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`;

export const createFilmCardTemplate = (film) => {
  const { comments, filmInfo, userDetails } = film;
  const { title, totalRating, description, genres, poster, release, runtime } = filmInfo;
  const { isWatched, isFavorite, isToWatch } = userDetails;
  const mainGenre = genres[0];

  return `
    <article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${getFullYear(release.date)}</span>
        <span class="film-card__duration">${getRuntime(runtime)}</span>
        <span class="film-card__genre">${mainGenre}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${trimDescription(description)}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${isToWatch ? CONTROLS_ITEM_ACTIVE_CLASSNAME : ''}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${isWatched ? CONTROLS_ITEM_ACTIVE_CLASSNAME : ''}" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite ${isFavorite ? CONTROLS_ITEM_ACTIVE_CLASSNAME : ''}" type="button">Mark as favorite</button>
      </div>
    </article>
  `;
};
