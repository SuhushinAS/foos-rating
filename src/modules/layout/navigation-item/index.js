import './style.less';
import {component} from 'utils/component';

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
      console.log(root);
    }
  }
);
