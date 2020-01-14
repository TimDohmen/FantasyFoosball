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
      })
      .catch(error => {
        throw new Error(error);
      });

  }
  filterByTeam(searchedTeam) {
    debugger
    let collection = store.State.allPlayers
    let team = collection.filter(p => p.team == searchedTeam)
    store.commit("displayPlayers", team);
  }
  filterPosition(position) {
    debugger
    let collection = store.State.allPlayers
    let displayTeam = collection.filter(p => p.position == position)
    store.commit("displayPlayers", displayTeam)
  }
  addPlayer(id) {
    let player = store.State.allPlayers.find(p => p.id == id)
    let team = store.State.myTeam
    team.push(player)
    store.commit("myTeam", team)
    console.log(store.State.myTeam)
  }


  //...
  //...
  loadPlayersData() {
    // debugger
    //check if the player already has a copy of the NFL playersData
    let localData = localStorage.getItem('nflData');
    //if they do, pull from there
    if (localData) {
      // debugger
      store.State.allPlayers = JSON.parse(localData).map(p => new Player(p));
      //return will short-circuit the loadPlayersData function
      //this will prevent the code below from ever executing
    }

    //if not go get that data
    // let url = "https://bcw-getter.herokuapp.com/?url=";
    // let endpointUri = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
    // let apiUrl = _sandBox + encodeURIComponent(endpointUri);

    // $.getJSON(_sandBox, function (data) {
    //   debugger
    //   store.State.allPlayers = data.body.players
    //   // .map(p => new Player(p));
    //   console.log('Player Data Ready')
    //   console.log('Writing Player Data to localStorage')
    //   localStorage.setItem('nflData', JSON.stringify(store.State.allPlayers))
    //   console.log('Finished Writing Player Data to localStorage')
    // });
  }
  // loadPlayersData(); //call the function above every time we create a new service


}

const service = new PlayerService();
export default service;
