const { Router } = require("express");
const AccountDragonTable = require("../accountDragon/table");
const router = new Router();
const DragonTable = require("../dragon/table");
const { authenticatedAccount } = require("./helper");

router.get("/new", (req, res, next) => {
  let accountId, dragon;

  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ account }) => {
      accountId = account.id;

      dragon = req.app.locals.engine.generation.newDragon();

      return DragonTable.storeDragon(dragon);
    })
    .then(({ dragonId }) => {
      console.log("dragonId", dragonId);

      // ❗ There's no need to retrieve all the data(objects) from database,
      //    we only need the auto generated one - dragonId(id) - others are
      //    already in the `dragon` object.
      dragon.dragonId = dragonId;

      return AccountDragonTable.storeAccountDragon({ accountId, dragonId });
    })
    .then(() => res.json({ dragon }))
    .catch((error) => next(error));
});

module.exports = router;
