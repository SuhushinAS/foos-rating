import {Base} from 'modules/common/base';
import {store} from 'modules/common/state';
import 'modules/rating/list';
import 'modules/rating/list-loader';
import {component} from 'utils/component';
import './style.less';

component(
  '.rating-container',
  class extends Base {
    /**
     * Конструктор класса для примера.
     * @param {*} root Элемент.
     * @return {void}
     */
    constructor(root) {
      super(root);
      this.bindEvents();
      this.load();
    }

    load() {
      store.updateStateKey('isLoading', () => true);
      fetch('/api/ratings').then(this.getJSON).then(this.onGetList);
    }

    getJSON = (response) => response.json();

    onGetList = ({ratings}) => {
      store.updateStateKey('ratings', () => ratings.map((rating, index) => ({...rating, position: index + 1})));
      store.updateStateKey('isLoading', () => false);
    };
  }
);
