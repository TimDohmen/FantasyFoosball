import store from "../store.js";
import PlayerService from "../Services/PlayerService.js";

//Private
function _draw() {
  console.log(store.State.everything)
}



//Public
export default class SongsController {
  constructor() {
    store.subscribe("everything", _draw);
    // SongService.getMySongs();
    this.getStuff()
  }

  getStuff() {
    try {
      PlayerService.getEverything()
    } catch (error) {
      console.log("hit da bad bugga")
    }
  }



}
