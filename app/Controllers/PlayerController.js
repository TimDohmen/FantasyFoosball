import store from "../store.js";
import PlayerService from "../Services/PlayerService.js";
import Player from "../Models/Player.js";

//Private
function _draw() {
  let template = ""
  let players = store.State.displayPlayers
  players.forEach(p => template += p.Template)
  document.querySelector("#players").innerHTML = template
}

function _drawTeams() {
  let template = ``
  let teams = store.State.teamChoices
  teams.forEach(t => template += `<option value="${t}">${t}</option>`)
  console.log(template);
  document.querySelector("#dropDownTeams").innerHTML = template

}



//Public
export default class SongsController {
  constructor() {
    _drawTeams()
    // store.subscribe("allPlayers", _draw);
    store.subscribe("displayPlayers", _draw);
    store.subscribe("teamChoices", _drawTeams)
    // this.getAllPlayers()
  }

  getAllPlayers() {
    PlayerService.getAllPlayers()
  }
  filterByTeam(team) {
    PlayerService.filterByTeam(team)
  }
  filterPosition(position) {
    PlayerService.filterPosition(position)
  }
  addPlayer(playerId) {
    PlayerService.addPlayer(playerId)
  }
  viewMyTeam() {
    PlayerService.viewMyTeam()
  }

}
