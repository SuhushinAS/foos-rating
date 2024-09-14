import {Base} from 'modules/common/base';
import {store} from 'modules/common/state';
import 'modules/rating/list';
import 'modules/rating/loader';
import {component} from 'utils/component';
import './style.less';

component(
  '.rating-container',
  class extends Base {
    constructor(root) {
      super(root);
      this.load();
    }

    load() {
      store.updateStateKey('isLoading', () => true);
      Promise.all([
        fetch('/api/ratings').then(this.getJSON),
        fetch('/api/ratings/season').then(this.getJSON),
      ]).then(this.onGetList);
    }

    getJSON = (response) => response.json();

    onGetList = ([{lastEvent, ratings}, {ratings: season, seasonStartDate}]) => {
      store.updateStateKey('lastEvent', () => lastEvent);
      store.updateStateKey('tsk', () => ({
        ratings: ratings.map(this.getRatingWithPosition),
        season: season.map(this.getRatingWithPosition),
      }));
      store.updateStateKey('seasonStartDate', () => seasonStartDate);
      store.updateStateKey('isLoading', () => false);
    };

    getRatingWithPosition = (rating, index) => ({...rating, position: index + 1});

    init() {
      super.init();

      const onLoading = this.onLoading.bind(this);

      this.loader = this.root.querySelector('.rating-container__loader');

      this.events = [
        [document, store.getEvent('isLoading'), onLoading],
      ];
    }

    onLoading({detail}) {
      if (detail) {
        this.loader.classList.remove('rating-container__loader_hide');
      } else {
        this.loader.classList.add('rating-container__loader_hide');
      }
    }
  }
);
