import PlayerController from "./Controllers/PlayerController.js"

class App {
  playerController = new PlayerController()
}

window["app"] = new App();
