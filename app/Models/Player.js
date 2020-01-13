export default class Player {
  constructor(data) {
    this.name = data.name
  }

  get Template() {
    return this.name
  }
}