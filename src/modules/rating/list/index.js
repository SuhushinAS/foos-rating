import {store} from 'modules/common/state';
import navigation from 'modules/layout/navigation/data.json';
import 'modules/rating/list-item';
import listItem from 'modules/rating/list-item/index.hbs';
import listLoader from 'modules/rating/list-loader/index.hbs';
import {component} from 'utils/component';
import {attachEvent} from 'utils/event';
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
      this.load();
      this.render();
      attachEvent(document, 'storeStateUpdate', this.render);
      attachEvent(root, 'change', this.onChange);
    }

    onChange = (e) => {
      const radio = e.target.closest('.rating-list-item-favorite__radio');

      if (radio) {
        const [id, value] = radio.value.split('-')
        store.updateState((prev) => {
          return {
            ...prev,
            favorite: {
              ...prev.favorite,
              [id]: !!(+value),
            },
          };
        });
      }
    };

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
      const {favorite, ratings, view} = store.state;

      if (view === navigation.last) {
        return ratings.filter(this.filterLast);
      }

      if (view === navigation.favorite) {
        return ratings.filter(this.filterFavorite);
      }

      return ratings.map((rating) => ({
        ...rating,
        isFavorite: favorite[rating.id],
      }));
    }

    filterFavorite = (rating) => store.state.favorite[rating.id];

    filterLast = (rating) => rating.wasInLastEvent;

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
