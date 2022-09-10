import {Base} from 'modules/common/base';
import {store} from 'modules/common/state';
import {component} from 'utils/component';
import './style.less';

component(
  '.navigation-item',
  class extends Base {
    /**
     * Конструктор класса для примера.
     * @param {*} root Элемент.
     * @return {void}
     */
    constructor(root) {
      super(root);

      this.render();
    }

    init() {
      super.init();
      const render = this.render.bind(this);
      const onChange = this.onChange.bind(this);

      this.radio = this.root.querySelector('.navigation-item__radio');

      this.events = [
        [document, store.getEvent('view'), render],
        [this.radio, 'change', onChange],
      ];
    }

    render() {
      const {view} = store.state;

      if (this.radio.value === view && !this.radio.checked) {
        this.radio.checked = true;
      }
    }

    onChange() {
      console.log(this.radio.value);
      store.updateStateKey('view', () => this.radio.value);
    }
  }
);
