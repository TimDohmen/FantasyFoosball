import store from "../store.js";
import Player from "../Models/Player.js";


let _sandBox = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/nflplayers"
});
class PlayerService {
  constructor() {
    this.loadPlayersData()
  }

  getAllPlayers() {
    _sandBox
      .get()
      .then(res => {
        let data = res.data.body.players.map(p => new Player(p));
        localStorage.setItem('nflData', JSON.stringify(data))
        store.commit("allPlayers", data);
        let teams = []
        data.forEach(p => teams.includes(p.team) ? "" : teams.push(p.team))
        store.commit("teamChoices", teams)
        debugger
        let positions = []
        data.forEach(p => positions.includes(p.position) ? "" : positions.push(p.position))
        store.commit("positionChoices", positions)
      })
      .catch(error => {
        throw new Error(error);
      });

  }
  filterByTeam(searchedTeam) {
    let collection = store.State.allPlayers
    let team = collection.filter(p => p.team == searchedTeam)
    store.commit("displayPlayers", team);
  }
  filterPosition(position) {
    let collection = store.State.allPlayers
    let displayTeam = collection.filter(p => p.position == position)
    store.commit("displayPlayers", displayTeam)
  }
  addPlayer(id) {
    let player = store.State.allPlayers.find(p => p.id == id)
    let team = store.State.myTeam
    player.owned = true
    team.push(player)
    store.commit("myTeam", team)
    console.log(store.State.myTeam)
  }
  removePlayer(id) {
    let player = store.State.myTeam.find(p => p.id == id)
    let team = store.State.myTeam
    player.owned = false
    team = team.filter(p => p.id != id)
    store.commit("myTeam", team)
  }
  viewMyTeam() {
    store.commit("displayPlayers", store.State.myTeam)
  }

  loadPlayersData() {
    let localData = localStorage.getItem('nflData');
    if (localData) {
      store.State.allPlayers = JSON.parse(localData).map(p => new Player(p));
      let teams = []
      store.State.allPlayers.forEach(p => teams.includes(p.team) ? "" : teams.push(p.team))
      store.commit("teamChoices", teams)
      let positions = []
      store.State.allPlayers.forEach(p => positions.includes(p.position) ? "" : positions.push(p.position))
      store.commit("positionChoices", positions)
    } else {
      this.getAllPlayers()
    }



  }
  // loadPlayersData(); //call the function above every time we create a new service


}

const service = new PlayerService();
export default service;
