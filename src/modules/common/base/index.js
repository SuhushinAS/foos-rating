/**
 * Class Scroll.
 * Класс для примера.
 */
export class Base {
  /**
   * Конструктор класса для примера.
   * @param {*} root Элемент.
   * @return {void}
   */
  constructor(root) {
    this.root = root;
    this.init();
    this.bindEvents();
  }

  root = null;

  events = [];

  init() {
  }

  destroy() {
    this.unbindEvents();
  }

  bindEvents() {
    this.events.forEach(([el, event, handler]) => el.addEventListener(event, handler));
  }

  unbindEvents() {
    this.events.forEach(([el, event, handler]) => el.removeEventListener(event, handler));
  }
}
