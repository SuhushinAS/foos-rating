import {Base} from 'modules/common/base';
import {store} from 'modules/common/state';
import navigation from 'modules/layout/navigation/data.json';
import 'modules/rating/list-item';
import listItem from 'modules/rating/list-item/index.hbs';
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
      this.render();
    }

    init() {
      super.init();

      const render = this.render.bind(this);
      const onChange = this.onChange.bind(this);

      this.events = [
        [document, store.getEvent('favorite'), render],
        [document, store.getEvent('ratings'), render],
        [document, store.getEvent('view'), render],
        [this.root, 'change', onChange],
      ];
    }

    onChange(e) {
      const radio = e.target.closest('.rating-list-item-favorite__radio');

      if (radio) {
        const [id, value] = radio.value.split('-');
        store.updateStateKey('favorite', (prev) => ({
          ...prev,
          [id]: !!(+value),
        }));
      }
    }

    getContent() {
      return this.getRatings().map((rating) => ({
        ...rating,
        isFavorite: store.state.favorite[rating.id],
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

    render() {
      console.log('render');
      this.root.innerHTML = this.getContent();
    }
  }
);
