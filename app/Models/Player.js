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
  }

  get Template() {
    return this.name
  }
}