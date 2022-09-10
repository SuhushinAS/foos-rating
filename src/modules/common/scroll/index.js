import baron from 'baron';
import {component} from 'utils/component';
import './style.less';

/**
 * Class Scroll.
 * Класс для примера.
 */
class Scroll {
  /**
   * Конструктор класса для примера.
   * @param {*} root Элемент.
   * @return {void}
   */
  constructor(root) {
    const {baronVId, direction = 'v'} = root.dataset;

    if (!baronVId) {
      baron({
        bar: '.scroll__bar',
        direction,
        impact: 'scroller',
        root,
        scroller: '.scroll__scroller',
        track: '.scroll__track',
      });
    }
  }
}

/**
 * Получить размер скролла.
 * @return {number} Размер скролла.
 */
function getScrollbarWidth() {
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  outer.style.msOverflowStyle = 'scrollbar';
  document.body.appendChild(outer);

  const inner = document.createElement('div');
  outer.appendChild(inner);

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  outer.parentNode.removeChild(outer);

  return scrollbarWidth;
}

/**
 *  Инициализация.
 */
function init() {
  const scrollWidth = getScrollbarWidth();

  if (0 < scrollWidth) {
    component('.scroll', Scroll);
  }
}

init();
