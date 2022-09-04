import './style.less';
import {store} from 'modules/common/state';
import {component} from 'utils/component';
import {attachEvent} from 'utils/event';

component(
  '.navigation-item',
  class {
    /**
     * Конструктор класса для примера.
     * @param {*} root Элемент.
     * @return {void}
     */
    constructor(root) {
      this.root = root;
      this.radio = root.querySelector('.navigation-item__radio');

      this.render();

      attachEvent(document, 'storeStateUpdate', this.render);
      attachEvent(this.radio, 'change', this.onChange);
    }

    render = () => {
      const {view} = store.state;

      if (this.radio.value === view && !this.radio.checked) {
        this.radio.checked = true;
      }
    };

    onChange = () => {
      store.updateState((prev) => {
        return {
          ...prev,
          view: this.radio.value,
        };
      });
    };
  }
);
