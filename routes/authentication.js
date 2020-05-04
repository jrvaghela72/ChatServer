var express = require("express");
var auth_router = express.Router();
const loginService = require("../services/loginService");

auth_router.get("/", function (req, res) {
    res.send();
});

auth_router.post("/login", loginService.login);
auth_router.post("/signup", loginService.signup);
module.exports = auth_router;
