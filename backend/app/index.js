const express = require("express");
const cors = require("cors");
const GenerationEngine = require("./generation/engine");
const dragonRouter = require("./api/dragon");
const generationRouter = require("./api/generation");

const app = express();
const engine = new GenerationEngine();

// make `engine` global in the app
app.locals.engine = engine;

app.use(cors({ origin: "http://localhost:1234" }));

/**
 * Routes
 */
app.use("/dragon", dragonRouter);
app.use("/generation", generationRouter);

/**
 * Error Handler
 */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    type: "error",
    message: err.message,
  });
});

engine.start();

module.exports = app;
