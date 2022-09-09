const stateKey = 'foos-rating-state';

const defaultState = {
  favorite: {},
  isLoading: undefined,
  ratings: [],
  view: 'home',
};

class Store {
  state;

  /**
   * Конструктор класса для примера.
   * @return {void}
   */
  constructor() {
    this.setState(this.getInitState());
  }

  getInitState() {
    const stateString = localStorage.getItem(stateKey);

    if (stateString) {
      try {
        return JSON.parse(stateString);
      } catch (error) {
        console.error(error);
      }
    }

    return defaultState;
  }

  onState(state) {
    document.dispatchEvent(
      new CustomEvent('storeStateUpdate', {
        detail: state,
      })
    );
  }

  onStateKey(key, state) {
    this.onState(state);
    document.dispatchEvent(
      new CustomEvent(this.getEvent(key), {
        detail: state,
      })
    );
  }

  setState(state) {
    this.state = state;
    localStorage.setItem(stateKey, JSON.stringify(this.state));
    this.onState(state);
  }

  setStateKey(key, state) {
    this.state[key] = state;
    localStorage.setItem(stateKey, JSON.stringify(this.state));
    this.onStateKey(key, state);
  }

  updateStateKey(key, onState) {
    this.setStateKey(key, onState(this.state[key]));
  }

  getEvent(key) {
    return `storeStateUpdateKey.${key}`;
  }
}

export const store = new Store();
