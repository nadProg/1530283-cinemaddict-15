import AbstractObserver from '../utils/abstract-observer.js';

export default class CommentsModel extends AbstractObserver{
  constructor(comments = []) {
    super();
    this._comments = comments;
  }

  getAll() {
    return this._comments;
  }

  setComments(updateType, comments) {
    this._comments = [ ...comments ];

    this._notify(updateType, comments);
  }

  deleteComment(updateType, id) {

    this._notify(updateType, id);
  }

  static adaptCommentToClient(comment) {
    const clientComment = { ...comment };

    clientComment.text = comment.comment;
    clientComment.date = new Date(comment.date);

    delete clientComment.comment;

    return clientComment;
  }

  static adaptNewCommentToServer(comment) {
    const serverComment = { ...comment };

    serverComment.comment = comment.text;

    delete serverComment.text;

    return serverComment;
  }
}
