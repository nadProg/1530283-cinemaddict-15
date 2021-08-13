import { generateFilms, getTopRatedFilms, getMostCommentedFilms  } from './mock/films.js';
import { generateComments, getCommentsByIds, generateNewComment } from './mock/comments.js';
import { generateFilters, getFilterCountByName } from './mock/filters.js';
import { ClassName, FilmsListOption, EXTRA_FILMS_AMOUNT, FILMS_STEP, SORT_ITEMS } from './const.js';
import { isEsc } from './utils/common.js';
import { render, remove } from './utils/render.js';
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
import CommentsContainerView from './views/comments-container.js';
import CommentsTitleView from './views/comments-title.js';
import CommentsListView from './views/comments-list.js';
import CommentView from './views/comment.js';
import NewCommentView from './views/new-comment.js';

import MainScreenPresenter from './presenters/main-screen.js';

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
  const profileView = new ProfileView(watchedFilmsAmount);
  render(container, profileView);
};


// Функция рендеринга навигации с фильтрами

const renderNavigation = (container, filters, activeItem) => {
  const navigationView = new NavigationView(filters, activeItem);
  render(container, navigationView);
};


// Функция рендеринга блока комментариев

const renderComment = (container, comment) => {
  const commentView = new CommentView(comment);
  render(container, commentView);
};

const renderComments = (container, comments, newComment) => {
  const commentTitleView = new CommentsTitleView(comments.length);
  const commentsListView = new CommentsListView();
  const newCommentView = new NewCommentView(newComment);

  comments.forEach((comment) => {
    renderComment(commentsListView, comment);
  });

  render(container, commentTitleView);
  render(container, commentsListView);
  render(container, newCommentView);
};


// Функция рендеринга попапа

const renderFilmDetails = (container, film) => {
  const filmDetailsView = new FilmDetailsView(film);
  const filmDetailsBottomView = new FilmDetailsBottomView();
  const commentsContainerViewView = new CommentsContainerView();

  const filmComments = getCommentsByIds(mockComments, film.comments);

  const onDocumentKeydown = (evt) => {
    if (isEsc(evt)) {
      evt.preventDefault();
      hideFilmDetails();
    }
  };

  render(filmDetailsView, filmDetailsBottomView);
  render(filmDetailsBottomView, commentsContainerViewView);
  renderComments(commentsContainerViewView, filmComments, mockNewComment);

  document.addEventListener('keydown', onDocumentKeydown);
  filmDetailsView.setClickHandler(hideFilmDetails);

  render(container, filmDetailsView);

  function hideFilmDetails() {
    remove(filmDetailsView);
    bodyElement.classList.remove(ClassName.HIDE_OVERFLOW);
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};


// Функция рендеринга блока управления сортировкой

const renderSortBar = (container, items, activeItem) => {
  const sortBarView = new SortBarView(items, activeItem);
  render(container, sortBarView);
};


// Функция рендеринга карточки фильма

const renderFilmCard = (container, film) => {
  const filmCardView = new FilmCardView(film);

  const showFilmDetails = () => {
    bodyElement.classList.add(ClassName.HIDE_OVERFLOW);
    renderFilmDetails(bodyElement, film);
  };

  filmCardView.setTitleClickHandler(showFilmDetails);
  filmCardView.setPosterClickHandler(showFilmDetails);
  filmCardView.setCommentsClickHandler(showFilmDetails);

  render(container, filmCardView);
};


// Функция частичного рендеринга карточек фильмов

const renderPartialFilms = (container, films, renderedAmount, step) => films
  .slice(renderedAmount, renderedAmount + step)
  .forEach((film) => {
    renderFilmCard(container, film);
  });


// Функция рендеринга блока с карточками фильмов:
//  - основной список с кнопкой Show More
//  - список Top Rated
//  - список Most Commented

const renderFilmsBoard = (container, films) => {
  const filmsBoardView = new FilmsBoardView();

  const mainFilmsListView = new FilmsListView(FilmsListOption.MAIN);
  const topRatedFilmsListView = new FilmsListView(FilmsListOption.TOP_RATED);
  const mostCommentedFilmsListView = new FilmsListView(FilmsListOption.MOST_COMMENTED);

  const mainFilmsContainerView = new FilmsContainerView();
  const topRatedFilmsContainerView = new FilmsContainerView();
  const mostCommentedFilmsContainerView = new FilmsContainerView();

  const showMoreButtonView = new ShowMoreButtonView();

  render(filmsBoardView, mainFilmsListView);
  render(filmsBoardView, topRatedFilmsListView);
  render(filmsBoardView, mostCommentedFilmsListView);

  render(mainFilmsListView, mainFilmsContainerView);
  render(topRatedFilmsListView, topRatedFilmsContainerView);
  render(mostCommentedFilmsListView, mostCommentedFilmsContainerView);

  let renderedFilmsAmount = 0;
  renderPartialFilms(mainFilmsContainerView, films, renderedFilmsAmount, FILMS_STEP);
  renderedFilmsAmount = FILMS_STEP;

  if (renderedFilmsAmount < films.length) {
    const onShowMoreButtonClick = () => {
      renderPartialFilms(mainFilmsContainerView, films, renderedFilmsAmount, FILMS_STEP);
      renderedFilmsAmount += FILMS_STEP;

      if (renderedFilmsAmount >= films.length) {
        remove(showMoreButtonView);
      }
    };

    showMoreButtonView.setClickHandler(onShowMoreButtonClick);
    render(mainFilmsListView, showMoreButtonView);
  }

  getTopRatedFilms(films)
    .slice(0, EXTRA_FILMS_AMOUNT)
    .forEach((film) => {
      renderFilmCard(topRatedFilmsContainerView, film);
    });

  getMostCommentedFilms(films)
    .slice(0, EXTRA_FILMS_AMOUNT)
    .forEach((film) => {
      renderFilmCard(mostCommentedFilmsContainerView, film);
    });

  render(container, filmsBoardView);
};


// Функция рендеринга блока без карточек фильмов

const renderEmptyBoard = (container) => {
  const filmsBoardView = new FilmsBoardView();
  const mainFilmsListView = new FilmsListView(FilmsListOption.EMPTY);

  render(filmsBoardView, mainFilmsListView);
  render(container, filmsBoardView);
};


// Функция рендеринга основного экрана приложения

const renderMainScreen = (container, films) => {
  if (!films.length) {
    renderEmptyBoard(container);
    return;
  }

  renderSortBar(container, SORT_ITEMS, SORT_ITEMS[0]);
  renderFilmsBoard(container, films);
};


// Функция рендеринга статистики в футере

const renderFooterStatisctic = (container, amount) => {
  const footerStatisticView = new FooterStatisticView(amount);
  render(container, footerStatisticView);
};


// Рендеринг приложения

renderProfile(headerElement, historyFilmsAmount);
renderNavigation(mainElement, mockFilters, mockFilters[0].name);
// renderMainScreen(mainElement, mockFilms);
renderFooterStatisctic(footerElement, allFilmsAmount);

const mainScreenPresenter = new MainScreenPresenter(mainElement);
mainScreenPresenter.init(mockFilms);
