import { isOnline } from '../utils/common.js';

import FilmsModel from '../models/films.js';
import CommentsModel from '../models/comments.js';

const getSyncedTasks = (items) =>
  items
    .filter(({success}) => success)
    .map(({payload}) => payload.task);

const createStoreStructure = (items) =>
  items
    .reduce((acc, current) => Object.assign({}, acc, {
      [current.id]: current,
    }), {});


export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  async getFilms() {
    if (isOnline()) {
      const films = await this._api.getFilms();

      const items = createStoreStructure(films.map(FilmsModel.adaptFilmToServer));
      this._store.setItems(items);

      return films;
    }

    const storeTasks = Object.values(this._store.getItems());

    return Promise.resolve(storeTasks.map(FilmsModel.adaptFilmToClient));
  }

  // updateTask(task) {
  //   if (isOnline()) {
  //     return this._api.updateTask(task)
  //       .then((updatedTask) => {
  //         this._store.setItem(updatedTask.id, TasksModel.adaptToServer(updatedTask));
  //         return updatedTask;
  //       });
  //   }

  //   this._store.setItem(task.id, TasksModel.adaptToServer(Object.assign({}, task)));

  //   return Promise.resolve(task);
  // }

  // addTask(task) {
  //   if (isOnline()) {
  //     return this._api.addTask(task)
  //       .then((newTask) => {
  //         this._store.setItem(newTask.id, TasksModel.adaptToServer(newTask));
  //         return newTask;
  //       });
  //   }

  //   return Promise.reject(new Error('Add task failed'));
  // }

  // deleteTask(task) {
  //   if (isOnline()) {
  //     return this._api.deleteTask(task)
  //       .then(() => this._store.removeItem(task.id));
  //   }

  //   return Promise.reject(new Error('Delete task failed'));
  // }

  // sync() {
  //   if (isOnline()) {
  //     const storeTasks = Object.values(this._store.getItems());

  //     return this._api.sync(storeTasks)
  //       .then((response) => {
  //         // Забираем из ответа синхронизированные задачи
  //         const createdTasks = getSyncedTasks(response.created);
  //         const updatedTasks = getSyncedTasks(response.updated);

  //         // Добавляем синхронизированные задачи в хранилище.
  //         // Хранилище должно быть актуальным в любой момент.
  //         const items = createStoreStructure([...createdTasks, ...updatedTasks]);

  //         this._store.setItems(items);
  //       });
  //   }

  //   return Promise.reject(new Error('Sync data failed'));
  // }
}
