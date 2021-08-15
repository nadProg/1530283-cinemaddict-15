import AbstractView from './abstract.js';
import { Emotion } from '../const';

const createEmotionInputTemplate = (emotion, isChecked) => {
  const checked = isChecked ? 'checked' : '';
  return `
    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}" ${checked}>
    <label class="film-details__emoji-label" for="emoji-${emotion}">
      <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
    </label>
  `;
};

export const createNewCommentTemplate = (text, currentEmotion) => {
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

export default class NewCommentView extends AbstractView {
  constructor(text = '', currentEmotion = '') {
    super();

    this._text = text;
    this._currentEmotion = currentEmotion;
  }

  getTemplate() {
    return createNewCommentTemplate(this._text, this._currentEmotion);
  }
}
