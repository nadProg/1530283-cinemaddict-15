import SmartView from './smart.js';
import { Emotion, NEW_COMMENT_DEFAULT } from '../const.js';
import { isEnter, isEsc } from '../utils/common.js';

const createEmotionInputTemplate = (emotion, isChecked) => {
  const checked = isChecked ? 'checked' : '';
  return `
    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}" ${checked}>
    <label class="film-details__emoji-label" for="emoji-${emotion}">
      <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
    </label>
  `;
};

export const createNewCommentTemplate = ({ text, currentEmotion }) => {
  const emotionInputsTemplate = Object.values(Emotion).map((emotion) => createEmotionInputTemplate(emotion, emotion === currentEmotion)).join('');
  const emojiLabelTemplate = currentEmotion ?
    `<img src="images/emoji/${currentEmotion}.png" width="55" height="55" alt="emoji-smile" />` : '';

  return `
    <div class="film-details__new-comment">
      <div class="film-details__add-emoji-label">
        ${emojiLabelTemplate}
      </div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${text}</textarea>
      </label>

      <div class="film-details__emoji-list">
        ${emotionInputsTemplate}
      </div>
    </div>
  `;
};

export default class NewCommentView extends SmartView {
  constructor(newCommentData = NEW_COMMENT_DEFAULT) {
    super();

    this._data = {
      ...newCommentData,
    };

    this._submitHandler = this._submitHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._emotionToggleHandler = this._emotionToggleHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createNewCommentTemplate(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setSubmitHandler(this._callback.submit);
  }

  setSubmitHandler(callback) {
    this._callback.submit = callback;
    this.getElement().addEventListener('keydown', this._submitHandler);
  }

  _reset() {
    this.updateData(NEW_COMMENT_DEFAULT);
  }

  _submitHandler(evt) {
    if (!(isEnter(evt) && evt.ctrlKey)) {
      return;
    }

    this._callback.submit();

    this._reset();
  }

  _emotionToggleHandler(evt) {
    const emotionInput = evt.target.closest('.film-details__emoji-item');
    if (!emotionInput || !evt.currentTarget.contains(emotionInput)) {
      return;
    }

    this.updateData({ currentEmotion: emotionInput.value });
  }

  _commentInputHandler(evt) {
    this.updateData({ text: evt.currentTarget.value }, true);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.film-details__emoji-list')
      .addEventListener('change', this._emotionToggleHandler);

    this.getElement()
      .querySelector('.film-details__comment-input')
      .addEventListener('input', this._commentInputHandler);
  }
}
