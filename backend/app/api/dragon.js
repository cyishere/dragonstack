const { Router } = require("express");
const AccountTable = require("../account/table");
const AccountDragonTable = require("../accountDragon/table");
const { getPublicDragons, getDragonWithTraits } = require("../dragon/helper");
const router = new Router();
const DragonTable = require("../dragon/table");
const { authenticatedAccount } = require("./helper");
const Breeder = require("../dragon/breeder");

/**
 * Generate New Dragon
 */
router.get("/new", (req, res, next) => {
  let accountId, dragon;

  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ account }) => {
      accountId = account.id;

      dragon = req.app.locals.engine.generation.newDragon({ accountId });

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

/**
 * Mate
 */
router.post("/mate", (req, res, next) => {
  const { matronDragonId, patronDragonId } = req.body;

  if (matronDragonId === patronDragonId) {
    throw new Error("Cannot breed with the same dragon!");
  }

  let matronDragon, patronDragon, patronSireValue;
  let matronAccountId, patronAccountId;

  getDragonWithTraits({ dragonId: patronDragonId })
    .then((dragon) => {
      if (!dragon.isPublic) {
        throw new Error("Dragon must be public");
      }

      patronDragon = dragon;
      patronSireValue = dragon.sireValue;

      return getDragonWithTraits({ dragonId: matronDragonId });
    })
    .then((dragon) => {
      matronDragon = dragon;

      return authenticatedAccount({ sessionString: req.cookies.sessionString });
    })
    .then(({ account, authenticated }) => {
      if (!authenticated) throw new Error("Unauthenticated");

      if (patronSireValue > account.balance) {
        throw new Error("Sire value exceeds balance");
      }

      matronAccountId = account.id;

      return AccountDragonTable.getDragonAccount({ dragonId: patronDragonId });
    })
    .then(({ accoundId }) => {
      patronAccountId = accoundId;

      if (matronAccountId === patronAccountId) {
        throw new Error("Cannot breed your own dragons!");
      }

      const dragon = Breeder.breedDragon({
        matron: matronDragon,
        patron: patronDragon,
      });

      return DragonTable.storeDragon(dragon);
    })
    .then(({ dragonId }) => {
      Promise.all([
        AccountTable.updateBalance({
          accountId: matronAccountId,
          value: -patronSireValue,
        }),
        AccountTable.updateBalance({
          accountId: patronAccountId,
          value: patronSireValue,
        }),
        AccountDragonTable.storeAccountDragon({
          dragonId,
          accountId: matronAccountId,
        }),
      ]);
    })
    .then(() => res.json({ message: "Breed success!" }))
    .catch((error) => next(error));
});

module.exports = router;
