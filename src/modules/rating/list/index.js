import {Base} from 'modules/common/base';
import 'modules/common/scroll';
import {store} from 'modules/common/state';
import viewType from 'modules/layout/navigation/viewType.json';
import {RatingListItem} from 'modules/rating/list-item';
import 'modules/rating/list-item';
import listItem from 'modules/rating/list-item/index.hbs';
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

    filterViewMap = {
      [viewType.last]: (rating) => rating.wasInLastEvent,
      [viewType.favorite]: (rating) => store.state.favorite[rating.id],
    };

    ratings = [];

    ratingItems = [];

    render() {
      this.ratingItems.forEach(this.ratingItemDestroy);
      this.ratings = store.state.ratings
        .filter(this.filterView)
        .map(this.getRatingFormat);
      this.body.innerHTML = this.ratings.map(listItem).join('');
      this.ratingItems = [...this.body.querySelectorAll('.rating-list-item')].map(this.ratingItemCreate);
    }

    filterView = (rating) => {
      const filterView = this.filterViewMap[store.state.view] ?? (() => true);

      return filterView(rating);
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
        [document, store.getEvent('ratings'), render],
        [document, store.getEvent('view'), render],
      ];
    }
  }
);
