import SmartView from './smart.js';
import { Emotion, ClassName, NEW_COMMENT_DEFAULT } from '../const.js';

const createEmotionInputTemplate = (emotion, isChecked) => {
  const checked = isChecked ? 'checked' : '';
  return `
    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}" ${checked}>
    <label class="film-details__emoji-label" for="emoji-${emotion}">
      <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
    </label>
  `;
};

export const createNewCommentTemplate = ({ text, emotion: currentEmotion }) => {
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

    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._emotionToggleHandler = this._emotionToggleHandler.bind(this);

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
    return this._data;
  }

  _emotionToggleHandler(evt) {
    const emotionInput = evt.target.closest(`.${ClassName.FILM_DETAILS_EMOJI_ITEM}`);
    if (!emotionInput || !evt.currentTarget.contains(emotionInput)) {
      return;
    }

    this.updateData({ emotion: emotionInput.value });
  }

  _commentInputHandler(evt) {
    this.updateData({ text: evt.currentTarget.value }, true);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.${ClassName.FILM_DETAILS_EMOJI_LIST}`)
      .addEventListener('change', this._emotionToggleHandler);

    this.getElement()
      .querySelector(`.${ClassName.FILM_DETAILS_TEXTAREA}`)
      .addEventListener('input', this._commentInputHandler);
  }
}
