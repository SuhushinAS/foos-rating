import {component} from 'utils/component';
import {store} from 'modules/common/state';
import './style.less';
import {attachEvent} from 'utils/event';
import listLoader from 'modules/rating/list-loader/index.hbs';
import listItem from 'modules/rating/list-item/index.hbs';

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
      this.load();
      this.render();
      attachEvent(document, 'storeStateUpdate', this.render);
    }

    load() {
      store.updateState((prev) => {
        return {
          ...prev,
          isLoading: true,
        };
      });
      fetch('/api/ratings').then(this.getJSON).then(this.onGetList);
    }

    render = () => {
      const {isLoading, ratings} = store.state;

      if (isLoading) {
        this.root.innerHTML = listLoader();
      } else {
        this.root.innerHTML = ratings.map(listItem).join('');
      }
    };

    getJSON = (response) => response.json();

    onGetList = ({ratings}) => {
      store.updateState((prev) => {
        return {
          ...prev,
          isLoading: false,
          ratings: ratings.map((rating, index) => ({...rating, position: index + 1})),
        };
      });
    };
  }
);
