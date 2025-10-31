const express = require("express");
const router = express();
const { handleSignUp, handleLogin, getUser } = require("../controllers/auth");
const { loginRestricted } = require("../middlewares/auth");

router.post("/signup", handleSignUp);
router.post("/login", handleLogin);
router.get("/user", loginRestricted, getUser);

module.exports = router;
