import {Base} from 'modules/common/base';
import {store} from 'modules/common/state';
import {component} from 'utils/component';
import schemeType from './schemeType.json';
import './style.less';

component(
  '.layout-scheme',
  class extends Base {
    scheme = schemeType.auto;

    init() {
      super.init();

      const onScheme = this.onScheme.bind(this);
      const onSchemeChange = this.onSchemeChange.bind(this);

      this.checkbox = this.root.querySelector('.layout-scheme__checkbox');
      this.scheme = store.state.scheme ?? schemeType.auto;

      this.events = [
        [document, store.getEvent('scheme'), onScheme],
        [this.checkbox, 'change', onSchemeChange],
      ];
    }

    onScheme({detail}) {
      console.log('onScheme');
      if (detail !== this.scheme) {
        this.scheme = detail ?? schemeType.auto;
        this.updateScheme(this.scheme);
      }
    }

    onSchemeChange() {
      this.scheme = (this.scheme + 1) % 3;

      store.setStateKey('scheme', this.scheme);
      this.updateScheme(this.scheme);
    }

    updateScheme(scheme) {
      switch (scheme) {
        case schemeType.auto:
          this.checkbox.checked = false;
          this.checkbox.indeterminate = true;
          break;
        case schemeType.dark:
          this.checkbox.checked = false;
          this.checkbox.indeterminate = false;
          break;
        case schemeType.light:
          this.checkbox.checked = true;
          this.checkbox.indeterminate = false;
          break;
      }
    }
  }
);
