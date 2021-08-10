import { generateFilms, getTopRatedFilms, getMostCommentedFilms  } from './mock/films.js';
import { generateComments, getCommentsByIds, generateNewComment } from './mock/comments.js';
import { generateFilters, getFilterCountByName } from './mock/filters.js';
import { ClassName, Place, FilmsListOption, EXTRA_FILMS_AMOUNT, FILMS_STEP, SORT_ITEMS } from './const.js';
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
  render(container, profileComponent, Place.BEFORE_END);
};


// Функция рендеринга навигации с фильтрами

const renderNavigation = (container, filters, activeItem) => {
  const navigationComponent = new NavigationView(filters, activeItem);
  render(container, navigationComponent, Place.BEFORE_END);
};


// Функция рендеринга блока комментариев

const renderComment = (container, comment) => {
  const commentComponent = new CommentView(comment);
  render(container, commentComponent, Place.BEFORE_END);
};

const renderComments = (container, comments, newComment) => {
  const commentTitleComponent = new CommentsTitleView(comments.length);
  const commentsListComponent = new CommentsListView();
  const newCommentComponent = new NewCommentView(newComment);

  comments.forEach((comment) => {
    renderComment(commentsListComponent, comment);
  });

  render(container, commentTitleComponent, Place.BEFORE_END);
  render(container, commentsListComponent, Place.BEFORE_END);
  render(container, newCommentComponent, Place.BEFORE_END);
};


// Функция рендеринга попапа

const renderFilmDetails = (container, film) => {
  const filmDetailsComponent = new FilmDetailsView(film);
  const filmDetailsBottomComponent = new FilmDetailsBottomView();
  const commentsContainerViewComponent = new CommentsContainerView();

  const filmComments = getCommentsByIds(mockComments, film.comments);

  const onDocumentKeydown = (evt) => {
    if (isEsc(evt)) {
      evt.preventDefault();
      hideFilmDetails();
    }
  };

  render(filmDetailsComponent, filmDetailsBottomComponent, Place.BEFORE_END);
  render(filmDetailsBottomComponent, commentsContainerViewComponent, Place.BEFORE_END);
  renderComments(commentsContainerViewComponent, filmComments, mockNewComment);

  document.addEventListener('keydown', onDocumentKeydown);
  filmDetailsComponent.setClickHandler(hideFilmDetails);

  render(container, filmDetailsComponent, Place.BEFORE_END);

  function hideFilmDetails() {
    remove(filmDetailsComponent);
    bodyElement.classList.remove(ClassName.HIDE_OVERFLOW);
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};


// Функция рендеринга блока управления сортировкой

const renderSortBar = (container, items, activeItem) => {
  const sortBarComponent = new SortBarView(items, activeItem);
  render(container, sortBarComponent, Place.BEFORE_END);
};


// Функция рендеринга карточки фильма

const renderFilmCard = (container, film) => {
  const filmCardComponent = new FilmCardView(film);

  const showFilmDetails = () => {
    bodyElement.classList.add(ClassName.HIDE_OVERFLOW);
    renderFilmDetails(bodyElement, film);
  };

  filmCardComponent.setTitleClickHandler(showFilmDetails);
  filmCardComponent.setPosterClickHandler(showFilmDetails);
  filmCardComponent.setCommentsClickHandler(showFilmDetails);

  render(container, filmCardComponent, Place.BEFORE_END);
};


// Функция рендеринга блока с карточками фильмов:
//  - основной список с кнопкой Show More
//  - список Top Rated
//  - список Most Commented

const renderFilmsBoard = (container, films) => {
  const filmsBoardComponent = new FilmsBoardView();

  const mainFilmsListComponent = new FilmsListView(FilmsListOption.MAIN);
  const topRatedFilmsListComponent = new FilmsListView(FilmsListOption.TOP_RATED);
  const mostCommentedFilmsListComponent = new FilmsListView(FilmsListOption.MOST_COMMENTED);

  const mainFilmsContainerComponent = new FilmsContainerView();
  const topRatedFilmsContainerComponent = new FilmsContainerView();
  const mostCommentedFilmsContainerComponent = new FilmsContainerView();

  const showMoreButtonComponent = new ShowMoreButtonView();

  render(filmsBoardComponent, mainFilmsListComponent, Place.BEFORE_END);
  render(filmsBoardComponent, topRatedFilmsListComponent, Place.BEFORE_END);
  render(filmsBoardComponent, mostCommentedFilmsListComponent, Place.BEFORE_END);

  render(mainFilmsListComponent, mainFilmsContainerComponent, Place.BEFORE_END);
  render(topRatedFilmsListComponent, topRatedFilmsContainerComponent, Place.BEFORE_END);
  render(mostCommentedFilmsListComponent, mostCommentedFilmsContainerComponent, Place.BEFORE_END);

  let renderedFilmsAmount = 0;

  const onShowMoreButtonClick = () => {
    films
      .slice(renderedFilmsAmount, renderedFilmsAmount + FILMS_STEP)
      .forEach((film) => {
        renderFilmCard(mainFilmsContainerComponent, film);
      });

    renderedFilmsAmount += FILMS_STEP;

    if (renderedFilmsAmount >= films.length) {
      remove(showMoreButtonComponent);
    }
  };

  render(mainFilmsListComponent, showMoreButtonComponent, Place.BEFORE_END);
  showMoreButtonComponent.setClickHandler(onShowMoreButtonClick);
  showMoreButtonComponent.getElement().click();

  getTopRatedFilms(films)
    .slice(0, EXTRA_FILMS_AMOUNT)
    .forEach((film) => {
      renderFilmCard(topRatedFilmsContainerComponent, film);
    });

  getMostCommentedFilms(films)
    .slice(0, EXTRA_FILMS_AMOUNT)
    .forEach((film) => {
      renderFilmCard(mostCommentedFilmsContainerComponent, film);
    });

  render(container, filmsBoardComponent, Place.BEFORE_END);
};


// Функция рендеринга блока без карточек фильмов

const renderEmptyBoard = (container) => {
  const filmsBoardComponent = new FilmsBoardView();
  const mainFilmsListComponent = new FilmsListView(FilmsListOption.EMPTY);

  render(filmsBoardComponent, mainFilmsListComponent, Place.BEFORE_END);
  render(container, filmsBoardComponent, Place.BEFORE_END);
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
  const footerStatisticComponent = new FooterStatisticView(amount);
  render(container, footerStatisticComponent, Place.BEFORE_END);
};


// Рендеринг приложения

renderProfile(headerElement, historyFilmsAmount);
renderNavigation(mainElement, mockFilters, mockFilters[0].name);
renderMainScreen(mainElement, mockFilms);
renderFooterStatisctic(footerElement, allFilmsAmount);
