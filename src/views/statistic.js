import SmartView from './smart.js';
import { Rank } from '../const.js';

const StatisticPeriodValue = {
  ALL_TIME: 'all-time',
  TODAY: 'today',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
};

const StatisticPeriodLabel = {
  ALL_TIME: 'All time',
  TODAY: 'Today',
  WEEK: 'Week',
  MONTH: 'Month',
  YEAR: 'Year',
};

const createPeriodInputTemplate = ({ value, checked, label }) => `
  <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${value}" value="${value}" ${checked ? 'checked' : ''}>
  <label for="statistic-${value}" class="statistic__filters-label">${label}</label>
`;

export const createStatisticTemplate = (statisticsData) => {
  const { rank, totalAmount, totalDuration, topGenre, activePeriodValue = StatisticPeriodValue.ALL_TIME} = statisticsData;

  const periodInputsTemplate = Object.entries(StatisticPeriodValue)
    .map(([period, value]) => createPeriodInputTemplate({
      value,
      label: StatisticPeriodLabel[period],
      checked: value === activePeriodValue,
    }))
    .join('');

  return `
    <section class="statistic">
      ${ rank && rank !== Rank.NONE ? `
        <p class="statistic__rank">
          Your rank
          <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
          <span class="statistic__rank-label">${rank}</span>
        </p>
      ` : ''}

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>
        ${periodInputsTemplate}
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${totalAmount || 0} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">
            ${totalDuration && totalDuration.hour || 0} <span class="statistic__item-description">h</span>
            ${totalDuration && totalDuration.minute || 0} <span class="statistic__item-description">m</span>
          </p>
        </li>
        ${topGenre ? `
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Top genre</h4>
            <p class="statistic__item-text">${topGenre}</p>
          </li>
        ` : ''}

      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>
  `;
};

export default class StatisticView extends SmartView {
  constructor() {
    super();

    this._periodChangeHandler = this._periodChangeHandler.bind(this);
  }

  getTemplate() {
    return createStatisticTemplate(this._data);
  }

  restoreHandlers() {
    this.setPeriodChangeHandler(this._callback.periodChange);
  }

  setPeriodChangeHandler(callback) {
    this._callback.periodChange = callback;

    this.getElement()
      .querySelector('.statistic__filters')
      .addEventListener('change', this._periodChangeHandler);
  }

  updateElement() {
    super.updateElement();

    console.log('Here must be chart update');
  }

  _periodChangeHandler(evt) {
    this._callback.periodChange(evt.target.value);
  }
}
