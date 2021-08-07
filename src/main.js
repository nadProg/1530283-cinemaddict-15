import { generateFilms, getTopRatedFilms, getMostCommentedFilms  } from './mock/films.js';
import { generateComments, getCommentsByIds, generateNewComment } from './mock/comments.js';
import { generateFilters, getFilterCountByName } from './mock/filters.js';
import { ClassName, Place, EXTRA_FILMS_AMOUNT, FILMS_STEP, SORT_TYPES } from './const.js';
import { render } from './utils.js';
import ProfileView from './views/profile.js';
import NavigationView from './views/navigation.js';
import FilmsBoardView from './views/films-board.js';
import FilmsListView from './views/films-list.js';
import FilmsContainerView from './views/films-container.js';
import SortBarView from './views/sort-bar.js';
import FilmCardView from './views/film-card.js';
import ShowMoreButtonView from './views/show-more-button.js';
import FooterStatisticView from './views/footer-statistic.js';
import FilmDetailsView from './views/film-details.js';
import FilmDetailsBottomView from './views/film-details-bottom.js';
import CommentsWrapView from './views/comments-wrap.js';
import CommentsTitleView from './views/comments-title.js';
import CommentsListView from './views/comments-list.js';
import CommentView from './views/comment.js';
import NewCommentView from './views/new-comment.js';


// Генерация моковых данных

const mockFilms = generateFilms();
const mockComments = generateComments();
const mockNewComment = generateNewComment();

const mockFilters = generateFilters(mockFilms);

const allFilmsAmount = getFilterCountByName(mockFilters, 'all');
const historyFilmsAmount = getFilterCountByName(mockFilters, 'history');


// Поиск основных узлов для рендеринга

const bodyElement = document.body;
const headerElement = bodyElement.querySelector(`.${ClassName.HEADER}`);
const mainElement = bodyElement.querySelector(`.${ClassName.MAIN}`);
const footerElement = bodyElement.querySelector(`.${ClassName.FOOTER}`);


// Функция рендеринга звания пользователя в хедере

const renderProfile = (container, watchedFilmsAmount) => {
  const profileComponent = new ProfileView(watchedFilmsAmount);
  render(container, profileComponent.getElement(), Place.BEFORE_END);
};


// Функция рендеринга навигации с фильтрами

const renderNavigation = (container, filters, activeItem) => {
  const navigationComponent = new NavigationView(filters, activeItem);
  render(container, navigationComponent.getElement(), Place.BEFORE_END);
};


// Функция рендеринга блока комментариев

const renderComment = (container, comment) => {
  const commentComponent = new CommentView(comment);
  render(container, commentComponent.getElement(), Place.BEFORE_END);
};

const renderComments = (container, comments, newComment) => {
  const commentTitleComponent = new CommentsTitleView(comments.length);
  const commentsListComponent = new CommentsListView();
  const newCommentComponent = new NewCommentView(newComment);

  comments.forEach((comment) => {
    renderComment(commentsListComponent.getElement(), comment);
  });

  render(container, commentTitleComponent.getElement(), Place.BEFORE_END);
  render(container, commentsListComponent.getElement(), Place.BEFORE_END);
  render(container, newCommentComponent.getElement(), Place.BEFORE_END);
};


// Функция рендеринга попапа

const renderFilmDetails = (film) => {
  const filmDetailsComponent = new FilmDetailsView(film);
  const filmDetailsBottomComponent = new FilmDetailsBottomView();
  const commentsWrapComponent = new CommentsWrapView();

  const filmComments = getCommentsByIds(mockComments, film.comments);

  render(filmDetailsComponent.getElement(), filmDetailsBottomComponent.getElement(), Place.BEFORE_END);
  render(filmDetailsBottomComponent.getElement(), commentsWrapComponent.getElement(), Place.BEFORE_END);
  renderComments(commentsWrapComponent.getElement(), filmComments, mockNewComment);

  filmDetailsComponent.getElement().querySelector(`.${ClassName.FILM_DETAILS_CLOSE_BTN}`)
    .addEventListener('click', () => {
      filmDetailsComponent.getElement().remove();
      filmDetailsComponent.removeElement();
      bodyElement.classList.remove(ClassName.HIDE_OVERFLOW);
    });

  bodyElement.classList.add(ClassName.HIDE_OVERFLOW);
  render(bodyElement, filmDetailsComponent.getElement(), Place.BEFORE_END);
};


// Функция рендеринга блока управления сортировкой

const renderSortBar = (container, types, activeType) => {
  const sortBarComponent = new SortBarView(types, activeType);
  render(container, sortBarComponent.getElement(), Place.BEFORE_END);
};


// Функция рендеринга карточки фильма

const renderFilmCard = (container, film) => {
  const filmCardComponent = new FilmCardView(film);

  const showFilmDetails = () => {
    renderFilmDetails(film );
  };

  filmCardComponent.getElement().querySelector(`.${ClassName.FILM_CARD_POSTER}`)
    .addEventListener('click', () => showFilmDetails());
  filmCardComponent.getElement().querySelector(`.${ClassName.FILM_CARD_TITLE}`)
    .addEventListener('click', () => showFilmDetails());
  filmCardComponent.getElement().querySelector(`.${ClassName.FILM_CARD_COMMENTS}`)
    .addEventListener('click', () => showFilmDetails(film));

  render(container, filmCardComponent.getElement(), Place.BEFORE_END);
};


// Функция рендеринга блока с карточками фильмов:
//  - основной список с кнопкой Show More
//  - блок Top Rated
//  - блок Most Commented

const renderFilmsBoard = (container, films) => {
  const filmsBoardComponent = new FilmsBoardView();

  const mainFilmsListComponent = new FilmsListView('All movies. Upcoming');
  const topRatedFilmsListComponent = new FilmsListView('Top rated', 'extra');
  const mostCommentedFilmsListComponent = new FilmsListView('Most commented', 'extra');

  const mainFilmsContainerComponent = new FilmsContainerView();
  const topRatedFilmsContainerComponent = new FilmsContainerView();
  const mostCommentedFilmsContainerComponent = new FilmsContainerView();

  const showMoreButtonComponent = new ShowMoreButtonView();

  render(filmsBoardComponent.getElement(), mainFilmsListComponent.getElement(), Place.BEFORE_END);
  render(filmsBoardComponent.getElement(), topRatedFilmsListComponent.getElement(), Place.BEFORE_END);
  render(filmsBoardComponent.getElement(), mostCommentedFilmsListComponent.getElement(), Place.BEFORE_END);

  render(mainFilmsListComponent.getElement(), mainFilmsContainerComponent.getElement(), Place.BEFORE_END);
  render(topRatedFilmsListComponent.getElement(), topRatedFilmsContainerComponent.getElement(), Place.BEFORE_END);
  render(mostCommentedFilmsListComponent.getElement(), mostCommentedFilmsContainerComponent.getElement(), Place.BEFORE_END);

  let renderedFilmsAmount = 0;

  const onShowMoreButtonClick = (evt) => {
    evt.preventDefault();

    films
      .slice(renderedFilmsAmount, renderedFilmsAmount + FILMS_STEP)
      .forEach((film) => {
        renderFilmCard(mainFilmsContainerComponent.getElement(), film);
      });

    renderedFilmsAmount += FILMS_STEP;

    if (renderedFilmsAmount >= films.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  };

  render(mainFilmsListComponent.getElement(), showMoreButtonComponent.getElement(), Place.BEFORE_END);
  showMoreButtonComponent.getElement().addEventListener('click', onShowMoreButtonClick);
  showMoreButtonComponent.getElement().click();

  getTopRatedFilms(films)
    .slice(0, EXTRA_FILMS_AMOUNT)
    .forEach((film) => {
      renderFilmCard(topRatedFilmsContainerComponent.getElement(), film);
    });

  getMostCommentedFilms(films)
    .slice(0, EXTRA_FILMS_AMOUNT)
    .forEach((film) => {
      renderFilmCard(mostCommentedFilmsContainerComponent.getElement(), film);
    });

  render(container, filmsBoardComponent.getElement(), Place.BEFORE_END);
};


// Функция рендеринга статистики в футере

const renderFooterStatisctic = (container, amount) => {
  const footerStatisticComponent = new FooterStatisticView(amount);
  render(container, footerStatisticComponent.getElement(), Place.BEFORE_END);
};


// Рендеринг

renderProfile(headerElement, historyFilmsAmount);
renderNavigation(mainElement, mockFilters, mockFilters[0].name);

renderSortBar(mainElement, SORT_TYPES, SORT_TYPES[0]);
renderFilmsBoard(mainElement, mockFilms);

renderFooterStatisctic(footerElement, allFilmsAmount);
