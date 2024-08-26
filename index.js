let express = require("express");
let cors = require("cors");
let { getAllGames, getGameById } = require("./controllers");
let app = express();

app.use(express.json());
app.use(cors());

app.get("/games", (req, res) => {
  let games = getAllGames();
  res.status(200).json({ games });
});

app.get("/games/details/:id", (req, res) => {
  let gameId = parseInt(req.params.id);
  let game = getGameById(gameId);
  if (!game) return res.status(404).json({ message: "game not found" });

  res.status(200).json({ game });
});

module.exports = { app };
