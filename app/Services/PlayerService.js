import store from "../store.js";


let _sandBox = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/nflPlayers",
  withCredentials: true
});

class PlayerService {
  constructor() {
  }

  getEverything() {
    _sandBox
      .get()
      .then(res => {
        let data = res.data.data;
        // .map(s => new Song(s))
        store.commit("everything", data);
      })
      .catch(error => {
        throw new Error(error.response.data.message);
      });

  }


}

const service = new PlayerService();
export default service;
