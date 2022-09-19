import {Base} from 'modules/common/base';
import {store} from 'modules/common/state';
import {component} from 'utils/component';
import schemeType from './schemeType.json';

component(
  '.html',
  class extends Base {
    get scheme() {
      if (false !== store.state.isLoading) {
        return this.deviceScheme;
      }

      if ('undefined' === typeof store.state.scheme) {
        return this.deviceScheme;
      }

      return store.state.scheme;
    }

    get deviceScheme() {
      if (this.schemeDark.matches) {
        return schemeType.dark;
      }

      return schemeType.light;
    }

    init() {
      super.init();

      const onScheme = this.onScheme.bind(this);

      this.schemeDark = window.matchMedia('(prefers-color-scheme: dark)');

      this.events = [
        [document, store.getEvent('isLoading'), onScheme],
        [this.schemeDark, 'change', onScheme],
      ];
    }

    onScheme() {
      console.log('onScheme');
      console.log(this.scheme);
      this.setScheme(this.scheme);
    }

    setScheme(scheme) {
      console.log(this.root);
    }
  }
);
