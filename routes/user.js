var express = require("express");
var auth_router = express.Router();
const userService = require("../services/userService");
auth_router.get("/getSingleUser", async function (req, res) {
    var response = {};
    if (req.query.user_id) {
        var user = await userService.getSingleUser(req.query.user_id)
        if (user) {
            response.message = "user found";
            response.user = user;
            return res.status(200).send(response);
        }
    } 
    response.message = "user not found";
    response.user = {};
    return res.status(404).send(response);
});

auth_router.get("/getAllUser",async function (req, res) {
    var response = {};
    var users = await userService.getAllUser();
    if (users && users.length > 0) {
        response.message = "user list";
        response.users = users;
        return res.status(200).send(response);
    }
    response.message = "user not found";
    response.users = [];
    return res.status(404).send(response);
});

module.exports = auth_router;
