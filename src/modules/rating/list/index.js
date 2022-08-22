import {component} from 'utils/component';
import {state} from 'modules/common/state';
import './style.less';

component(
  '.rating-list',
  class {
    /**
     * Конструктор класса для примера.
     * @param {*} root Элемент.
     * @return {void}
     */
    constructor(root) {
      this.root = root;
      fetch('https://tsk.gear54.me/api/ratings').then(this.getJSON).then(this.onGetList)
    }

    getJSON = (response) => {
      console.log(response);
      return response.json();
    };

    onGetList = (result) => {
      console.log(result);
    };
  }
);
