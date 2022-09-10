import './style.less';
import {store} from 'modules/common/state';
import {component} from 'utils/component';

component(
  '.navigation-item',
  class {
    events = [];

    /**
     * Конструктор класса для примера.
     * @param {*} root Элемент.
     * @return {void}
     */
    constructor(root) {
      this.root = root;
      this.radio = this.root.querySelector('.navigation-item__radio');
      this.events = [
        [document, store.getEvent('view'), this.render],
        [this.radio, 'change', this.onChange],
      ];

      this.init();
      this.render();
    }

    init() {
      this.events.forEach(([el, event, handler]) => {
        el.addEventListener(event, handler);
      });
    }

    destroy() {
      this.events.forEach(([el, event, handler]) => {
        el.removeEventListener(event, handler);
      });
    }

    render = () => {
      const {view} = store.state;

      if (this.radio.value === view && !this.radio.checked) {
        this.radio.checked = true;
      }
    };

    onChange = () => {
      store.updateStateKey('view', () => this.radio.value);
    };
  }
);
