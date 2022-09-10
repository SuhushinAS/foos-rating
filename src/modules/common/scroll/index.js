import baron from 'baron';
import {Base} from 'modules/common/base';
import {component} from 'utils/component';
import './style.less';

/**
 * Class Scroll.
 * Класс для примера.
 */
class Scroll extends Base {
  /**
   * Конструктор класса для примера.
   * @param {*} root Элемент.
   * @return {void}
   */
  constructor(root) {
    super(root);

    this.scrollList = [
      baron({
        bar: '.scroll__bar_v',
        barOnCls: 'scroll_scrollbar_v',
        direction: 'v',
        impact: 'scroller',
        root,
        scroller: '.scroll__scroller',
        track: '.scroll__track_v',
      }),
      baron({
        bar: '.scroll__bar_h',
        barOnCls: 'scroll_scrollbar_h',
        direction: 'h',
        impact: 'scroller',
        root,
        scroller: '.scroll__scroller',
        track: '.scroll__track_h',
      }),
    ];
  }

  destroy() {
    super.destroy();

    this.scrollList.forEach((baron) => {
      baron.dispose();
    });
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
