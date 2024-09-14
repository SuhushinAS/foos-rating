import {Base} from 'modules/common/base';
import {store} from 'modules/common/state';
import {component} from 'utils/component';
import './style.less';

component(
  '.navigation-item',
  class extends Base {
    constructor(root) {
      super(root);

      this.render();
    }

    init() {
      super.init();
      const render = this.render.bind(this);
      const onChange = this.onChange.bind(this);

      this.checkbox = this.root.querySelector('.navigation-item__checkbox');

      this.events = [
        [document, store.getEvent(this.checkbox.name), render],
        [this.checkbox, 'change', onChange],
      ];
    }

    render() {
      this.checkbox.checked = store.state[this.checkbox.name];
    }

    onChange() {
      store.updateStateKey(this.checkbox.name, () => this.checkbox.checked);
    }
  }
);
