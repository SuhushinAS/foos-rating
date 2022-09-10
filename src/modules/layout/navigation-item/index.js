import './style.less';
import {Base} from 'modules/common/base';
import {store} from 'modules/common/state';
import {component} from 'utils/component';

component(
  '.navigation-item',
  class extends Base {
    events = [];

    /**
     * Конструктор класса для примера.
     * @param {*} root Элемент.
     * @return {void}
     */
    constructor(root) {
      super(root);
      this.radio = this.root.querySelector('.navigation-item__radio');
      this.events = [
        [document, store.getEvent('view'), this.render],
        [this.radio, 'change', this.onChange],
      ];

      this.bindEvents();
      this.render();
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
