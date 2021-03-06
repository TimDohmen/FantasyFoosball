export default class Player {
  constructor(data) {
    this.name = data.fullname || data.name
    this.age = data.age
    this.jersey = data.jersey
    this.team = data.pro_team || data.team
    this.bye = data.bye_week || data.bye || "Not Active/No Bye Week"
    this.photo = data.photo
    this.position = data.position
    this.lastName = data.lastname || data.lastName
    this.firstName = data.firstname || data.firstName
    this.status = data.pro_status || data.status
    this.id = data.id
    this.owned = data.owned || false
  }
  // <h5>Position: ${this.position}  -- ${this.team}</h5>
  // <p class="pb-3">Bye Week: ${byeWeek}<p> </div>

  get Template() {
    let byeWeek = this.bye.split(",")[0]
    let template = ''
    template += `
    <div class=" col-sm-6 col-md-3 pt-3 mb-3">
      <div class="card h-100 row no-gutters ${this.team}outline">
      <div class="col-2 h-100 team-bg ${this.team}">
      <h3 class="verticalText" onclick="app.playerController.filterByTeam('${this.team}')">${this.team}</h3>
      </div>
      <div class="col-10 text-center">
      <h3 class="noWrapName">${this.name}</h3>
      
      <img src="${this.photo}" class="card-img-top" alt="...">
      <div id="ribbon">
    <div id="nav">
      <ul class="nav">
        <li><i class="fas fa-football-ball fa-2x  ">
  <p class="cardText" onclick="app.playerController.filterPosition('${this.position}')">
  ${this.position}
  </p>
  </i></li>
    
  
      
      `
    if (this.owned) {
      template += `
        <li >
        <button class="btn btn-danger profileBtn" onclick="app.playerController.removePlayer(${this.id})">Remove</button>
        </li>`
    }
    else {
      template += `
        <li >
        <button class="btn btn-primary profileBtn" onclick="app.playerController.addPlayer(${this.id})">Add To Team</button>
        </li>`
    }
    template += `
      </ul>
    </div>
  </div></div>
      </div>
    </div> `
    return template
  }
}