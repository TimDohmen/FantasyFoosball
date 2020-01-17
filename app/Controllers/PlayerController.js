import store from "../store.js";
import PlayerService from "../Services/PlayerService.js";
import Player from "../Models/Player.js";

//draws all players to display
function _draw() {
  let template = ""
  let players = store.State.displayPlayers
  players.forEach(p => template += p.Template)
  document.querySelector("#players").innerHTML = template
}
//Renders dropdown for teams
function _drawTeams() {
  let template = `<option disabled selected>Choose a Team</option>`
  let teams = store.TeamChoices
  teams.forEach(t => template += `<option value="${t}">${t}</option>`)
  document.querySelector("#dropDownTeams").innerHTML = template
}
//Renders dropdown for positions
function _drawPositions() {
  let template = `<option disabled selected>Choose a Position</option>`
  let positions = store.PositionChoices
  positions.forEach(p => template += `<option value="${p}">${p}</option>`)
  document.querySelector("#dropDownPositions").innerHTML = template
}

//Public
export default class PlayerController {
  constructor() {
    store.subscribe("displayPlayers", _draw);
    store.subscribe("myTeam", _draw)
    store.subscribe("allPlayers", _drawTeams)
    store.subscribe("allPlayers", _drawPositions)
  }
  filterByTeam(team) {
    PlayerService.filterByTeam(team)
  }
  filterPosition(position) {
    PlayerService.filterPosition(position)
  }
  filterByName() {
    event.preventDefault()
    PlayerService.filterByName(event.target.playerName.value)
    event.target.reset()
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