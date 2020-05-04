
var models = require("../models");
const jwt = require('jsonwebtoken');

exports.login = async function (req, res) {
    return userLogin(req, res);
}

exports.signup = async function (req, res) {
    try {
        var userModel = req.body;
        var response = {};
        if (userModel) {
            var user = await models.users.findOne({
                where: {
                    user_name: userModel.user_name
                }
            });
            if (user) {
                response.message = 'user already exist';
                response.user = {};
                return res.status(401).send(response);
            } else {
                var userCreated = await models.users.create(userModel);
                response.message = 'User created';
                response.user = userCreated;
                return res.status(200).send(response);
            }
        }
    } catch (error) {
        response.message = "server error";
        response.user = {};
        return res.status(500).send(response);
    }
}

async function userLogin(req,res) {
    try {
        var authModel = req.body;
        var response = {};
        var username = authModel.user_name;
        var password = authModel.password;
        if (!username || !password || password == "" || username == "") {
            response.message = 'invalid creadential';
            response.user = {};
            return res.status(404).send(response);
        } else {
            var user = await models.users.findOne({
                where: {
                    password: password,
                    user_name: username,
                }
            });
            if (user) {
                response.message = 'User exist';
                response.token = jwt.sign({
                    user_name:user.user_name,
                    full_name:user.full_name,
                    address:user.address,
                    email:user.email,
                    title:user.title,
                    user_image:user.user_image
                }, '132sdfwec@@3432278');
                return res.status(200).send(response);
            } else {
                response.message = 'User not found with this creadential';
                response.user = {};
                return res.status(400).send(response);
            }
        }
    } catch (error) {
        response.message = "server error";
        response.user = {};
        return res.status(500).send(response);
    }
}