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



//Public
export default class SongsController {
  constructor() {
    store.subscribe("allPlayers", _draw);
    store.subscribe("displayPlayers", _draw);

    // this.getAllPlayers()
  }

  getAllPlayers() {
    try {
      PlayerService.getAllPlayers()
    } catch (error) {
      console.log("hit da bad bugga")
    }
    console.log("got players")
  }
  filterByTeam() {
    PlayerService.filterByTeam()
  }
  filterPosition(position) {
    PlayerService.filterPosition(position)
  }
  addPlayer(playerId) {
    PlayerService.addPlayer(playerId)
  }


}
