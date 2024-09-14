import {Base} from 'modules/common/base';
import {store} from 'modules/common/state';
import {component} from 'utils/component';
import './style.less';

component(
  '.header',
  class extends Base {
    constructor(root) {
      super(root);

      this.renderFavorite();
      this.renderLast();
      this.renderSeason();
    }

    init() {
      super.init();
      const renderFavorite = this.renderFavorite.bind(this);
      const renderLast = this.renderLast.bind(this);
      const renderSeason = this.renderSeason.bind(this);

      this.favorite = this.root.querySelector('.header__row_data .header__col_favorite');
      this.last = this.root.querySelector('.header__row_data .header__col_last');
      this.season = this.root.querySelector('.header__row_data .header__col_season');
      this.events = [
        [document, store.getEvent('isFavorite'), renderFavorite],
        [document, store.getEvent('isLast'), renderLast],
        [document, store.getEvent('isSeason'), renderSeason],
      ];
    }

    renderFavorite() {
      this.favorite.innerHTML = store.state.isFavorite ? 'Избранные' : 'Все';
    }

    renderLast() {
      this.last.innerHTML = store.state.isLast ? 'Последнее' : 'Все';
    }

    renderSeason() {
      this.season.innerHTML = store.state.isSeason ? 'Сезон' : 'Общий';
    }
  }
);
