const { Router } = require("express");
const AccountTable = require("../account/table");
const { hash } = require("../account/helper");
const { setSession } = require("./helper");

const router = new Router();

/**
 * Register
 */
router.post("/signup", (req, res, next) => {
  const { username, password } = req.body;

  const usernameHash = hash(username);
  const passwordHash = hash(password);

  AccountTable.getAccount({ usernameHash })
    .then(({ account }) => {
      if (!account) {
        return AccountTable.storeAccount({ usernameHash, passwordHash });
      } else {
        const error = new Error("This username has already been taken");

        error.statusCode = 409;

        throw error;
      }
    })
    .then(() => {
      return setSession({ username, res });
    })
    .then(({ message }) => res.json({ message }))
    .catch((error) => next(error));
});

/**
 * LOGIN
 */
router.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  AccountTable.getAccount({ usernameHash: hash(username) })
    .then(({ account }) => {
      if (account && account.passwordHash === hash(password)) {
        const { sessionId } = account;
        return setSession({ username, res, sessionId });
      } else {
        const error = new Error("Incorrect username or password");

        error.statusCode = 409;

        throw error;
      }
    })
    .then(({ message }) => res.json({ message }))
    .catch((error) => next(error));
});

module.exports = router;
