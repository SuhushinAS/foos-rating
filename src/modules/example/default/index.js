import {component} from 'utils/component';
import './style.less';

component(
  '.example-default',
  class {
    /**
     * Конструктор класса для примера.
     * @param {*} root Элемент.
     * @return {void}
     */
    constructor(root) {
      this.root = root;
    }
  }
);
