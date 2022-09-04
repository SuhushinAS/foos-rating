import {component} from 'utils/component';
import {store} from 'modules/common/state';
import './style.less';
import {attachEvent} from 'utils/event';
import listLoader from 'modules/rating/list-loader/index.hbs';
import listItem from 'modules/rating/list-item/index.hbs';
import navigation from 'modules/layout/navigation/data.json';

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

    getContent() {
      const {isLoading} = store.state;

      if (isLoading) {
        return listLoader();
      }

      return this.getRatings().map(listItem).join('');
    }

    getRatings() {
      const {ratings, view} = store.state;

      if (view === navigation.last) {
        return ratings.filter(this.filterLast);
      }

      return ratings;
    }

    filterLast = ({wasInLastEvent}) => wasInLastEvent;

    render = () => {
      this.root.innerHTML = this.getContent();
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
