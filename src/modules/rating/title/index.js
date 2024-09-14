import {Base} from 'modules/common/base';
import {component} from 'utils/component';
import './style.less';

component(
  '.rating-title',
  class extends Base {

    init() {
      super.init();

      const render = this.render.bind(this);

      this.orientationPortrait = window.matchMedia('(orientation: portrait)');
      this.render();

      this.events = [
        [window, 'resize', render],
      ];
    }

    render() {
      const sizeKey = this.orientationPortrait.matches ? 'width' : 'height';
      const rect = this.root.getBoundingClientRect();
      const size = rect[sizeKey];
      const fontSize = `${Math.floor(size / 2)}px`;

      console.log(fontSize, sizeKey, size, this.orientationPortrait);
      // this.root.style.fontSize = fontSize;
    }
  }
);
