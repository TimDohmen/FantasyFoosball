export default class Player {
  constructor(data) {
    this.name = data.fullname
    this.age = data.age
    this.jersey = data.jersey
    this.team = data.pro_team
    this.bye = data.bye_week
    this.photo = data.photo
    this.position = data.position
    this.lastName = data.lastname
    this.firstName = data.firstname
    this.status = data.pro_status
    this.id = data.id
  }

  get Template() {
    return `
    <div class="col-3 pt-3 mb-3">
    <div class="card h-100">
    <img src="${this.photo}" class="card-img-top" alt="...">
    <div class="card-body">
    <h3>${this.name}</h3>
    <h5>Position: ${this.position}</h5>
    <p class="pb-3">Bye Week: ${this.bye[0]}<p> </div>
  <button onclick="app.playerController.addPlayer(${this.id})">Add To Team</button>
    </div>
    </div> 
    `
  }
}