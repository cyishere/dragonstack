const { Router } = require("express");
const AccountTable = require("../account/table");
const AccountDragonTable = require("../accountDragon/table");
const { getPublicDragons } = require("../dragon/helper");
const router = new Router();
const DragonTable = require("../dragon/table");
const { authenticatedAccount } = require("./helper");

/**
 * Generate New Dragon
 */
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

/**
 * Update
 */
router.put("/update", (req, res, next) => {
  const { dragonId, nickname, isPublic, saleValue, sireValue } = req.body;

  DragonTable.updateDragon({
    dragonId,
    nickname,
    isPublic,
    saleValue,
    sireValue,
  })
    .then(() => res.json({ message: "successfully update dragon" }))
    .catch((error) => next(error));
});

/**
 * Get Public Dragons
 */
router.get("/public-dragons", (req, res, next) => {
  console.log("COOL");
  getPublicDragons()
    .then(({ dragons }) => {
      console.log("HEY!");
      res.json({ dragons });
    })
    .catch((error) => next(error));
});

/**
 * Buy a dragon
 */
router.post("/buy", (req, res, next) => {
  const { dragonId, saleValue } = req.body;
  let buyerId;

  DragonTable.getDragon({ dragonId })
    .then((dragon) => {
      if (dragon.saleValue !== saleValue) {
        throw new Error("Sale value is not correct");
      }

      if (!dragon.isPublic) {
        throw new Error("Dragon must be public");
      }

      return authenticatedAccount({ sessionString: req.cookies.sessionString });
    })
    .then(({ account, authenticated }) => {
      if (!authenticated) {
        throw new Error("Unauthenticated");
      }

      if (saleValue > account.balance) {
        throw new Error("Save value exceeds balance");
      }

      buyerId = account.id;

      return AccountDragonTable.getDragonAccount({ dragonId });
    })
    .then(({ accountId }) => {
      if (accountId === buyerId) {
        throw new Error("Can not buy your own dragon!");
      }

      const sellerId = accountId;

      return Promise.all([
        AccountTable.updateBalance({
          accountId: buyerId,
          value: -saleValue,
        }),
        AccountTable.updateBalance({
          accountId: sellerId,
          value: saleValue,
        }),
        AccountDragonTable.updateDragonAccount({
          dragonId,
          accountId: buyerId,
        }),
        DragonTable.updateDragon({
          dragonId,
          isPublic: false,
        }),
      ]);
    })
    .then(() => res.json({ message: "Deal success!" }))
    .catch((error) => next(error));
});

module.exports = router;
