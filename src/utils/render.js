import { Place } from '../const.js';
import Abstact from '../views/abstract.js';

export const render = (container, element, place) => {
  if (container instanceof Abstact) {
    container = container.getElement();
  }

  if (element instanceof Abstact) {
    element = element.getElement();
  }

  switch (place) {
    case Place.BEFORE_END:
      container.append(element);
      break;
    case Place.AFTER_BEGIN:
      container.prepend(element);
      break;
  }
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};
