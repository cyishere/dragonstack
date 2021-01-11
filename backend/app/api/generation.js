const { Router } = require("express");
const app = require("..");
const router = new Router();

router.get("/", (req, res) => {
  res.json({ generation: req.app.locals.engine.generation });
});

module.exports = router;
