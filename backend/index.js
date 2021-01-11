const express = require("express");
const GenerationEngine = require("./engine");

const app = express();
const engine = new GenerationEngine();
const port = 3001;

engine.start();

app.get("/dragon/new", (req, res) => {
  res.json({ dragon: engine.generation.newDragon() });
});

app.listen(port, () =>
  console.log(`🚀 server running on http://localhost:${port}`)
);
