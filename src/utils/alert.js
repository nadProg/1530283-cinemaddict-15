const ALERT_TIME = 3000;
const BASE_CLASS = 'alert';
const AlertType = {
  SUCCESS: 'success',
  ERROR: 'error',
}

const createAlertNode = (text, type) => {
  const alertNode = document.createElement('div');
  alertNode.classList.add(BASE_CLASS, `${BASE_CLASS}--${type}`);
  alertNode.innerHTML = '<p class="alert__text"></p>';

  alertNode.querySelector('.alert__text').textContent = text;

  return alertNode;
};

const onAlertNodeAnimationEnd = ({ currentTarget }) => {
  currentTarget.removeEventListener('animationend', onAlertNodeAnimationEnd);
  currentTarget.remove();
};

const alert = (text, {time = ALERT_TIME, type = AlertType.ERROR } = {}) => {
  const alertNode = createAlertNode(text, type);

  alertNode.style.animationDuration = `${time}ms`;
  alertNode.addEventListener('animationend', onAlertNodeAnimationEnd);

  document.body.appendChild(alertNode);
};

export { alert, AlertType }
