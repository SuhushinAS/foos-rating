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
      this.load();
    }

    load() {
      store.updateStateKey('isLoading', () => true);
      fetch('/api/ratings').then(this.getJSON).then(this.onGetList);
    }

    getJSON = (response) => response.json();

    onGetList = ({ratings}) => {
      store.updateStateKey('ratings', () => ratings.map(this.getRatingWithPosition));
      store.updateStateKey('isLoading', () => false);
    };

    getRatingWithPosition = (rating, index) => ({...rating, position: index + 1});

    init() {
      super.init();

      const onLoading = this.onLoading.bind(this);

      this.loader = this.root.querySelector('.rating-container__loader');

      this.events = [
        [document, store.getEvent('isLoading'), onLoading],
      ];
    }

    onLoading({detail}) {
      if (detail) {
        this.loader.classList.remove('rating-container__loader_hide');
      } else {
        this.loader.classList.add('rating-container__loader_hide');
      }
    }
  }
);
