const express = require("express");
const router = express();
const { handleSignUp, handleLogin, getUser } = require("../controllers/auth");

router.post("/signup", handleSignUp);
router.post("/login", handleLogin);
router.get("/:userid", getUser);

module.exports = router;
