import store from "../store.js";
import Player from "../Models/Player.js";

let _sandBox = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/nflplayers"
});

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
function savePlayers(teamName, players) {
  localStorage.setItem(teamName, JSON.stringify(players))
}
function loadPlayers(teamName) {
  let rawData = JSON.parse(localStorage.getItem(teamName)) || []
  return rawData.map(p => new Player(p))
}

class PlayerService {
  constructor() {
    this.loadPlayersData()
  }

  filterByTeam(searchedTeam) {
    let collection = store.State.allPlayers
    let team = collection.filter(p => p.team == searchedTeam)
    store.commit("displayPlayers", team);
  }
  filterByName(name) {
    let collection = store.State.allPlayers
    let team = collection.filter(p => p.name.toLowerCase().includes(name.toLowerCase()))
    store.commit("displayPlayers", team);
  }
  filterPosition(position) {
    let collection = store.State.allPlayers
    let displayTeam = collection.filter(p => p.position == position)
    store.commit("displayPlayers", displayTeam)
  }

  addPlayer(id) {
    let playerIndex = -1
    let player = store.State.allPlayers.find((p, i) => {
      if (p.id == id) {
        playerIndex = i
        return p
      }
    })
    if (!player) {
      console.error("invalid id")
      return
    }
    let team = store.State.myTeam
    player.owned = true
    team.push(player)
    store.State.allPlayers.splice(playerIndex, 1)
    store.commit("myTeam", team)
    savePlayers("myTeam", team)
  }

  removePlayer(id) {
    let team = store.State.myTeam
    let player = team.find(p => p.id == id)
    player.owned = false
    team = team.filter(p => p.id != id)
    store.State.allPlayers.push(player)
    store.commit("myTeam", team)
    store.commit("displayPlayers", team)
    savePlayers("myTeam", team)
  }

  viewMyTeam() {
    store.commit("displayPlayers", store.State.myTeam)
  }

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