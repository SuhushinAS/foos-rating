import {Base} from 'modules/common/base';
import 'modules/common/scroll';
import {store} from 'modules/common/state';
import {RatingListItem} from 'modules/rating/list-item';
import 'modules/rating/list-item';
import listItem from 'modules/rating/list-item/index.hbs';
import 'modules/rating/title';
import {component} from 'utils/component';
import changeType from './changeType.json';
import './style.less';

component(
  '.rating-list',
  class extends Base {
    constructor(root) {
      super(root);
      this.body = this.root.querySelector('.rating-list__table-body');
      this.render();
    }

    ratings = [];

    ratingItems = [];

    render() {
      const ratingKey = store.state.isSeason ? 'season' : 'ratings';

      this.ratingItems.forEach(this.ratingItemDestroy);
      this.ratings = store.state.tsk[ratingKey]
        .filter(this.filterView)
        .map(this.getRatingFormat);
      this.body.innerHTML = this.ratings.map(listItem).join('');
      this.ratingItems = [...this.body.querySelectorAll('.rating-list-item')].map(this.ratingItemCreate);
    }

    filterView = (rating) => {
      const {isFavorite, isLast} = store.state;
      const checkFavorite = !isFavorite || !!store.state.favorite[rating.id];
      const checkLast = !isLast || !!rating.wasInLastEvent;

      return checkFavorite && checkLast;
    };

    getRatingFormat = (rating) => ({
      ...rating,
      isFavorite: store.state.favorite[rating.id],
      positionChange: this.getChange(rating.positionChange),
      positionChangeType: this.getChangeType(rating.positionChange),
      valueChange: this.getChange(rating.valueChange),
      valueChangeType: this.getChangeType(rating.valueChange),
    });

    getChange(change) {
      if (change > 0) {
        return `+${change}`;
      }

      return `${change}`;
    }

    getChangeType(change) {
      if (change > 0) {
        return changeType.positive;
      }

      if (change < 0) {
        return changeType.negative;
      }

      return changeType.none;
    }

    ratingItemCreate = (ratingItemRoot) => new RatingListItem(ratingItemRoot);

    ratingItemDestroy = (ratingItem) => ratingItem.destroy();

    destroy() {
      super.destroy();

      this.ratingItems.forEach(this.ratingItemDestroy);
    }

    init() {
      super.init();

      const render = this.render.bind(this);

      this.events = [
        [document, store.getEvent('isFavorite'), render],
        [document, store.getEvent('isLast'), render],
        [document, store.getEvent('isSeason'), render],
        [document, store.getEvent('tsk'), render],
        [document, store.getEvent('view'), render],
      ];
    }
  }
);
