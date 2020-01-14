export default class Team {
  constructor(data) {
    this.QB = [] || data.QB
    this.WR = [] || data.WR
    this.RB = [] || data.RB
    this.K = [] || data.K
    this.TE = [] || data.TE
    this.DEF = [] || data.DEF
  }

  get Template() {
    let template = ""

    for (const key in this.QB) {
      if (this.QB.hasOwnProperty(key)) {
        template += `<p>${this.QB[key]}</p>`;

      }
    }
    return template
  }

}
