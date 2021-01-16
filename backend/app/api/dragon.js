const { Router } = require("express");
const router = new Router();
const DragonTable = require("../dragon/table");

router.get("/new", (req, res) => {
  const dragon = req.app.locals.engine.generation.newDragon();

  DragonTable.storeDragon(dragon)
    .then(({ dragonId }) => {
      console.log("dragonId", dragonId);

      dragon.dragonId = dragonId;

      res.json({ dragon });
    })
    .catch((error) => console.error(error));
});

module.exports = router;
