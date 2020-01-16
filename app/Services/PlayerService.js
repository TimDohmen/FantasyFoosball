import store from "../store.js";
import Player from "../Models/Player.js";

let _sandBox = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/nflplayers"
});
//NOTE these functions are above the class to be private because they are never called in another file
//NOTE this attempts to loadplayers with the key("allPlayers"), if local storage doesnt return anything, it will do a get request to the sandbox to retrieve players and save them in local storage
async function getNFLData() {
  try {
    let players = loadPlayers("allPlayers")
    if (!players.length) {
      let res = await _sandBox.get()
      players = res.data.body.players.map(p => new Player(p));
      savePlayers('allPlayers', players)
    }
    return players
  } catch (error) {
    console.error(error)
  }
}
//NOTE takes in a key(teamName) to save at in local storage and then the value(players) to be set there
function savePlayers(teamName, players) {
  localStorage.setItem(teamName, JSON.stringify(players))
}
//NOTE takes in a key(teamName) to retrieve saved data from local storage and maps the data to new players
function loadPlayers(teamName) {
  let rawData = JSON.parse(localStorage.getItem(teamName)) || []
  return rawData.map(p => new Player(p))
}

class PlayerService {
  constructor() {
    //NOTE on load of this service this function will be called
    this.loadPlayersData()
  }
  //NOTE loads players and myTeam, then filters myTeams players out of the collection of players so you can't add them twice
  async loadPlayersData() {
    let allPlayers = await getNFLData()
    let myTeam = loadPlayers("myTeam")
    let teamIds = {}
    myTeam.forEach(p => teamIds[p.id] = true)
    allPlayers = allPlayers.filter(player => !teamIds[player.id])
    store.commit('allPlayers', allPlayers)
    store.commit('myTeam', myTeam)
  }
}

const service = new PlayerService();
export default service;
