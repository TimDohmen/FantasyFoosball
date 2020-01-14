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
    // store.subscribe("allPlayers", _draw);
    store.subscribe("displayPlayers", _draw);
    store.subscribe("teamChoices", _drawTeams)
    // this.getAllPlayers()
  }

  getAllPlayers() {
    try {
      PlayerService.getAllPlayers()
    } catch (error) {
      console.log("hit da bad bugga", error)
    }
    console.log("got players")
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


}
