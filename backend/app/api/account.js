const { Router } = require("express");
const AccountTable = require("../account/table");
const { hash } = require("../account/helper");

const router = new Router();

router.post("/signup", (req, res, next) => {
  const { username, password } = req.body;

  const usernameHash = hash(username);
  const passwordHash = hash(password);

  AccountTable.storeAccount({ usernameHash, passwordHash })
    .then(() => res.json({ message: "success!" }))
    .catch((error) => next(error));
});

module.exports = router;
