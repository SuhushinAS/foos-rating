import {Base} from 'modules/common/base';
import {store} from 'modules/common/state';
import navigation from 'modules/layout/navigation/data.json';
import 'modules/rating/list-item-favorite';
import './style.less';
import {RatingListItemFavorite} from 'modules/rating/list-item-favorite';

export class RatingListItem extends Base {
  /**
   * Конструктор класса для примера.
   * @param {*} root Элемент.
   * @return {void}
   */
  constructor(root) {
    super(root);

    const favorite = this.root.querySelector('.rating-list-item-favorite');

    this.favorite = new RatingListItemFavorite(favorite);
  }

  rating = {};

  initRating(rating) {
    this.rating = rating;
    this.favorite.initFavorite(store.state.favorite[rating.id]);
  }

  destroy() {
    super.destroy();

    this.favorite.destroy();
  }
}
