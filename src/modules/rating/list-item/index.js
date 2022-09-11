import {Base} from 'modules/common/base';
import 'modules/rating/list-item-favorite';
import {RatingListItemFavorite} from 'modules/rating/list-item-favorite';
import './style.less';

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

  destroy() {
    super.destroy();

    this.favorite.destroy();
  }
}
