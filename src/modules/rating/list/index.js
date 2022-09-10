import {Base} from 'modules/common/base';
import {store} from 'modules/common/state';
import navigation from 'modules/layout/navigation/data.json';
import 'modules/rating/list-item';
import listItem from 'modules/rating/list-item/index.hbs';
import listLoader from 'modules/rating/list-loader/index.hbs';
import {component} from 'utils/component';
import './style.less';

component(
  '.rating-list',
  class extends Base {
    /**
     * Конструктор класса для примера.
     * @param {*} root Элемент.
     * @return {void}
     */
    constructor(root) {
      super(root);
      this.events = [
        [document, store.getEvent('favorite'), this.render],
        [document, store.getEvent('isLoading'), this.render],
        [document, store.getEvent('ratings'), this.render],
        [document, store.getEvent('view'), this.render],
        [this.root, 'change', this.onChange],
      ];
      this.bindEvents();
      this.load();
      this.render();
    }

    onChange = (e) => {
      const radio = e.target.closest('.rating-list-item-favorite__radio');

      if (radio) {
        const [id, value] = radio.value.split('-');
        store.updateStateKey('favorite', (prev) => ({
          ...prev,
          [id]: !!(+value),
        }));
      }
    };

    load() {
      store.updateStateKey('isLoading', () => true);
      fetch('/api/ratings').then(this.getJSON).then(this.onGetList);
    }

    getContent() {
      const {favorite, isLoading} = store.state;

      if (isLoading) {
        return listLoader();
      }

      return this.getRatings().map((rating) => ({
        ...rating,
        isFavorite: favorite[rating.id],
      })).map(listItem).join('');
    }

    getRatings() {
      const {ratings, view} = store.state;

      if (view === navigation.last) {
        return ratings.filter(this.filterLast);
      }

      if (view === navigation.favorite) {
        return ratings.filter(this.filterFavorite);
      }

      return ratings;
    }

    filterFavorite = (rating) => store.state.favorite[rating.id];

    filterLast = (rating) => rating.wasInLastEvent;

    render = () => {
      this.root.innerHTML = this.getContent();
    };

    getJSON = (response) => response.json();

    onGetList = ({ratings}) => {
      store.updateStateKey('ratings', () => ratings.map((rating, index) => ({...rating, position: index + 1})));
      store.updateStateKey('isLoading', () => false);
    };
  }
);
