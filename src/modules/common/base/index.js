/**
 * Class Scroll.
 * Класс для примера.
 */
export class Base {
  constructor(root) {
    this.root = root;
    this.init();
    this.bindEvents();
  }

  root = null;

  events = [];

  init() {
  }

  bindEvents() {
    this.events.forEach(([el, event, handler]) => el.addEventListener(event, handler));
  }

  destroy() {
    this.unbindEvents();
  }

  unbindEvents() {
    this.events.forEach(([el, event, handler]) => el.removeEventListener(event, handler));
  }
}
