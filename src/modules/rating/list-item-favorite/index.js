import './style.less';
import {Base} from 'modules/common/base';
import {store} from 'modules/common/state';

export class RatingListItemFavorite extends Base {
  init() {
    super.init();

    const onChange = this.onChange.bind(this);

    this.input = this.root.querySelector('.rating-list-item-favorite__input');
    this.events = [
      [this.input, 'change', onChange]
    ];
  }

  onChange(e) {
    const {checked, value} = e.target;
    store.updateStateKey('favorite', (prev) => ({
      ...prev,
      [value]: checked,
    }));
  }

  initFavorite(isFavorite) {
    this.input.checked = isFavorite;
  }
}
