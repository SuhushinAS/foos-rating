import {Base} from 'modules/common/base';
import {store} from 'modules/common/state';
import viewType from 'modules/layout/navigation/viewType.json';
import {component} from 'utils/component';
import './style.less';

component(
  '.header',
  class extends Base {
    constructor(root) {
      super(root);

      this.render();
    }

    init() {
      super.init();
      const render = this.render.bind(this);

      this.inner = this.root.querySelector('.header__inner');
      this.events = [
        [document, store.getEvent('lastEvent'), render],
        [document, store.getEvent('view'), render],
      ];
    }

    render() {
      this.inner.innerHTML = this.getContent();
    }

    getContent() {
      const {lastEvent, view} = store.state;

      switch (view) {
        case viewType.home:
          return 'Foos Rating';
        case viewType.last:
          return lastEvent.name ?? '&nbsp;';
        case viewType.favorite:
          return 'Избранное';
      }
    }
  }
);
