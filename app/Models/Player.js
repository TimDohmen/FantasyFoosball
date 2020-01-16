export default class Player {
  //NOTE this should handle the base info needed from the server to create a player.
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

  get Template() {
    return ""
  }
}