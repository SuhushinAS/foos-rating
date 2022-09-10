import {Base} from 'modules/common/base';
import {store} from 'modules/common/state';
import navigation from 'modules/layout/navigation/data.json';
import 'modules/rating/list-item';
import {RatingListItem} from 'modules/rating/list-item';
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

    filterViewMap = {
      [navigation.last]: (rating) => rating.wasInLastEvent,
      [navigation.favorite]: (rating) => store.state.favorite[rating.id],
    };

    ratings = [];
    ratingItems = [];

    render() {
      this.ratingItems.forEach(this.ratingItemDestroy);
      this.ratings = store.state.ratings
        .filter(this.filterView)
        .map(this.getRatingWithFavorite);
      this.root.innerHTML = this.ratings.map(listItem).join('');
      this.ratingItems = [...this.root.querySelectorAll('.rating-list-item')].map(this.ratingItemCreate);
    }

    filterView = (rating) => {
      const filterView = this.filterViewMap[store.state.view] ?? (() => true);

      return filterView(rating);
    };

    getRatingWithFavorite = (rating) => ({...rating, isFavorite: store.state.favorite[rating.id]});

    ratingItemCreate = (ratingItemRoot, index) => {
      const ratingItem = new RatingListItem(ratingItemRoot);

      ratingItem.initRating(this.ratings[index]);

      return ratingItem;
    };

    ratingItemDestroy = (ratingItem) => ratingItem.destroy();

    init() {
      super.init();

      const render = this.render.bind(this);

      this.events = [
        [document, store.getEvent('favorite'), render],
        [document, store.getEvent('ratings'), render],
        [document, store.getEvent('view'), render],
      ];
    }

    destroy() {
      super.destroy();

      this.ratingItems.forEach(this.ratingItemDestroy);
    }
  }
);
