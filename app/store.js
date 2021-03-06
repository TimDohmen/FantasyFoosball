import Player from "./Models/Player.js";

let _state = {
  allPlayers: [],
  /**@type {Player[]} */
  displayPlayers: [],
  myTeam: []
};

/** Collection of listeners to be called based on keyed state changes
 * @type {{[x:string]: function[]}}
 */
let _listeners = {
  allPlayers: [],
  displayPlayers: [],
  myTeam: []
};

//NOTE You should not need to change the code from this point down

/**
 * Validates the property string is defined in both the state and the listeners
 * @param {string} prop
 */
function _validateProp(prop) {
  if (!_state[prop] || !_listeners[prop]) {
    throw new Error(`Unable to subscribe to ${prop}`);
  }
}

/**
 * Validates the subscriber is a function
 * @param {function} fn
 * @param {string} prop
 */
function _validateSubscriber(fn, prop) {
  if (typeof fn != "function") {
    throw new Error(`Unable to subscribe to ${prop} fn must be a function`);
  }
}

class Store {
  /**
   * Provides access to application state data
   */
  get State() {
    return _state;
  }
  get TeamChoices() {
    let teams = []
    _state.allPlayers.forEach(p => {
      if (!teams.includes(p.team)) {
        teams.push(p.team)
      }
    })
    return teams
  }
  get PositionChoices() {
    let positions = []
    _state.allPlayers.forEach(p => {
      if (!positions.includes(p.position)) {
        positions.push(p.position)
      }
    })
    return positions
  }
  /**
   * Takes in a property to observe, and a function to run when it changes
   * @param {string} prop
   * @param {function} fn
   */
  subscribe(prop, fn) {
    _validateProp(prop);
    _validateSubscriber(fn, prop);
    _listeners[prop].push(fn);
  }

  /**
   * Takes in a property to set, and the value to set it to
   * @param {string} prop
   * @param {any} data
   */
  commit(prop, data) {
    _validateProp(prop);
    _state[prop] = data;
    _listeners[prop].forEach(fn => fn());
  }
}

const store = new Store();
export default store;