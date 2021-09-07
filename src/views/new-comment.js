import { Emotion, ClassName, NEW_COMMENT_DEFAULT } from '../const.js';

import SmartView from './smart.js';

const createEmotionInputTemplate = ({ emotion, isChecked, isDisabled }) => {
  const checked = isChecked ? 'checked' : '';
  const inputDisabled = isDisabled ? 'disabled' : '';
  return `
    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}" ${checked} ${inputDisabled}>
    <label class="film-details__emoji-label" for="emoji-${emotion}">
      <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
    </label>
  `;
};

export const createNewCommentTemplate = ({ text, emotion: currentEmotion, isDisabled, isError }) => {
  const emotionInputsTemplate = Object.values(Emotion)
    .map((emotion) => createEmotionInputTemplate({
      emotion,
      isDisabled,
      isChecked: emotion === currentEmotion,
    }))
    .join('');

  const emojiLabelTemplate = currentEmotion ?
    `<img src="images/emoji/${currentEmotion}.png" width="55" height="55" alt="emoji-smile" />` : '';

  const textAreaDisabled = isDisabled ? 'disabled' : '';
  const errorClass = isError ? ClassName.SHAKE : '';

  return `
    <div class="film-details__new-comment ${errorClass}">
      <div class="film-details__add-emoji-label">
        ${emojiLabelTemplate}
      </div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" ${textAreaDisabled}>${text}</textarea>
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

    this._data = { ...newCommentData };

    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._emotionChangeHandler = this._emotionChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createNewCommentTemplate(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  reset() {
    this.updateData(NEW_COMMENT_DEFAULT);
  }

  getData() {
    return {
      text: this._data.text,
      emotion: this._data.emotion,
    };
  }

  setErrorState() {
    this.updateData({ isError: true });
  }

  clearErrorState() {
    this.updateData({ isError: false });
  }

  enable() {
    this.updateData({ isDisabled: false });
  }

  disable() {
    this.updateData({ isDisabled: true });
  }

  _emotionChangeHandler(evt) {
    const emotionInput = evt.target.closest(`.${ClassName.FILM_DETAILS_EMOJI_ITEM}`);
    if (!emotionInput || !evt.currentTarget.contains(emotionInput)) {
      return;
    }

    this.updateData({
      emotion: emotionInput.value,
      isError: false,
    });
  }

  _commentInputHandler(evt) {
    this.updateData({
      text: evt.currentTarget.value,
      isError: false,
    }, { isElementUpdate: true });
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.${ClassName.FILM_DETAILS_EMOJI_LIST}`)
      .addEventListener('change', this._emotionChangeHandler);

    this.getElement()
      .querySelector(`.${ClassName.FILM_DETAILS_TEXTAREA}`)
      .addEventListener('input', this._commentInputHandler);
  }
}
