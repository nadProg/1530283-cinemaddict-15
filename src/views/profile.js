const ProfileRating = {
  NOVICE: 'Novice',
  FAN: 'Fan',
  MOVIE_BUFF: 'Movie Buff',
};

const getProfileRating = (watchedFilmsAmount) => {
  if (watchedFilmsAmount <= 10) {
    return ProfileRating.NOVICE;
  }

  if (watchedFilmsAmount <= 20) {
    return ProfileRating.FAN;
  }

  return ProfileRating.MOVIE_BUFF;
};

export const createProfileTemplate = (films) => {
  const watchedFilmsAmount = films.reduce((count, film) => film.userDetails.isWatched ? ++count : count, 0);
  console.log(watchedFilmsAmount);

  return  `
    <section class="header__profile profile">
      ${watchedFilmsAmount ? `<p class="profile__rating">${getProfileRating(watchedFilmsAmount)}</p>` : ''}
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>
  `;
};
