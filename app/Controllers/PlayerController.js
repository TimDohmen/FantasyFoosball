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
  document.querySelector("#dropDownTeams").innerHTML = template

}
function _drawPositions() {
  debugger
  let template = ``
  let positions = store.State.positionChoices
  positions.forEach(p => template += `<option value="${p}">${p}</option>`)
  document.querySelector("#dropDownPositions").innerHTML = template

}



//Public
export default class SongsController {
  constructor() {
    _drawTeams()
    _drawPositions()
    store.subscribe("displayPlayers", _draw);
    store.subscribe("myTeam", _draw)

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
  removePlayer(playerId) {
    PlayerService.removePlayer(playerId)
  }

}
