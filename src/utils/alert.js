const ALERT_TIME = 5000;

const createAlertNode = (text) => {
  const alertNode = document.createElement('div');
  alertNode.classList.add('alert');
  alertNode.innerHTML = '<p class="alert__text"></p>';

  alertNode.querySelector('.alert__text').textContent = text;

  return alertNode;
};

const onAlertNodeAnimationEnd = ({ currentTarget }) => {
  currentTarget.removeEventListener('animationend', onAlertNodeAnimationEnd);
  currentTarget.remove();
};

export const alert = (text) => {
  const alertNode = createAlertNode(text);

  alertNode.style.animationDuration = `${ALERT_TIME}ms`;
  alertNode.addEventListener('animationend', onAlertNodeAnimationEnd);

  document.body.appendChild(alertNode);
};
