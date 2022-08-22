const stateKey = 'foos-rating-state';

const defaultState = {
  favorite: {},
  players: {
    data: {},
    list: [],
  },
  view: 'full',
};

class State {
  state;

  /**
   * Конструктор класса для примера.
   * @return {void}
   */
  constructor() {
    this.initState();
  }

  initState() {
    const stateString = localStorage.getItem(stateKey);

    if (stateString) {
      try {
        const state = JSON.parse(stateString);
        this.setState(state);
      } catch (error) {
        console.error(error);
      }
    }

    this.setState(defaultState);
  }

  onState() {
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

export const state = new State();
