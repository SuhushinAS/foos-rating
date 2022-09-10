/**
 * Class Scroll.
 * Класс для примера.
 */
export class Base {
  root = null;

  events = [];

  /**
   * Конструктор класса для примера.
   * @param {*} root Элемент.
   * @return {void}
   */
  constructor(root) {
    this.root = root;
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
