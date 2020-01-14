import store from "../store.js";
import Player from "../Models/Player.js";


let _sandBox = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/nflplayers"
});
class PlayerService {
  constructor() {
  }

  getAllPlayers() {
    _sandBox
      .get()
      .then(res => {
        let data = res.data.body.players.map(p => new Player(p));
        store.commit("allPlayers", data);
      })
      .catch(error => {
        throw new Error(error.response.data.message);
      });

  }
  filterByTeam() {
    let collection = store.State.allPlayers
    let team = collection.filter(p => p.team == "SEA")
    store.commit("displayPlayers", team);
  }
  filterPosition(position) {
    debugger
    let collection = store.State.allPlayers
    let displayTeam = collection.filter(p => p.position == position)
    store.commit("displayPlayers", displayTeam)
  }

}

const service = new PlayerService();
export default service;
