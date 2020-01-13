import store from "../store.js";
import PlayerService from "../Services/PlayerService.js";
import Player from "../Models/Player.js";

//Private
function _draw() {
  let template = ""
  let players = store.State.playersByTeam
  players.forEach(p => template += p.name + ", ")
  document.querySelector("#players").innerHTML = template
}



//Public
export default class SongsController {
  constructor() {
    store.subscribe("allPlayers", _draw);
    store.subscribe("playersByTeam", _draw);

    this.getAllPlayers()
  }

  getAllPlayers() {
    try {
      PlayerService.getAllPlayers()
    } catch (error) {
      console.log("hit da bad bugga")
    }
  }
  filterByTeam() {
    PlayerService.filterByTeam()
  }



}
