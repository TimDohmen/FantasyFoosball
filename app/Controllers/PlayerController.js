import store from "../store.js";
import PlayerService from "../Services/PlayerService.js";
import Player from "../Models/Player.js";

let currentPage = 1
let numberPerPage = 16
let numberOfPages = 0

//draws all players to display
function _draw() {
  let template = ""
  var begin = ((currentPage - 1) * numberPerPage);
  var end = begin + numberPerPage;
  let players = store.State.displayPlayers.slice(begin, end);
  players.forEach(p => template += p.Template)
  numberOfPages = Math.ceil(store.State.displayPlayers.length / 20);
  document.querySelector("#players").innerHTML = template
  document.querySelector("#pageNum").innerHTML = currentPage.toString()
  document.querySelector("#totalPages").innerHTML = numberOfPages.toString()
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
    store.subscribe("displayPlayers", this.checkButtons);

  }
  nextPage() {
    currentPage += 1;
    _draw();
    this.checkButtons()
  }
  prevPage() {
    currentPage -= 1;
    _draw();
    this.checkButtons()

  }
  lastPage() {
    currentPage = numberOfPages;
    _draw();
    this.checkButtons()

  }
  firstPage() {
    currentPage = 1;
    _draw();
    this.checkButtons()

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
  checkButtons() {
    document.getElementById("next").disabled = currentPage == numberOfPages ? true : false;
    document.getElementById("prev").disabled = currentPage == 1 ? true : false;
    document.getElementById("first").disabled = currentPage == 1 ? true : false;
    document.getElementById("last").disabled = currentPage == numberOfPages ? true : false
  }
}