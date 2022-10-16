import {Base} from 'modules/common/base';
import {store} from 'modules/common/state';
import schemeType from 'modules/layout/scheme/schemeType.json';
import {component} from 'utils/component';

const classNames = {
  [schemeType.dark]: 'html_dark',
  [schemeType.light]: 'html_light',
};

component(
  '.html',
  class extends Base {
    get scheme() {
      return store.state.scheme || this.deviceScheme;
    }

    get deviceScheme() {
      if (this.schemeDark.matches) {
        return schemeType.dark;
      }

      return schemeType.light;
    }

    init() {
      super.init();

      this.schemeDark = window.matchMedia('(prefers-color-scheme: dark)');
      this.onScheme();

      const onScheme = this.onScheme.bind(this);

      this.events = [
        [document, store.getEvent('scheme'), onScheme],
        [this.schemeDark, 'change', onScheme],
      ];
    }

    onScheme() {
      this.root.classList.remove(classNames[schemeType.dark], classNames[schemeType.light]);

      const className = classNames[this.scheme];

      if (className) {
        this.root.classList.add(className);
      }
    }
  }
);
