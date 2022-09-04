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

  setState(state) {
    this.state = state;
    localStorage.setItem(stateKey, JSON.stringify(state));
    this.onState(state);
  }

  updateState(onState) {
    this.setState(onState(this.state));
  }
}

export const store = new Store();
