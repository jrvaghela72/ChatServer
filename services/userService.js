
var models = require("../models");

const getSingleUser = async function (user_id) {
    var user = {};
    try {
        if (user_id) {
            user = await models.users.findOne({
                where: {
                    user_id: user_id
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
    return user;
}

const getAllUser = async function () {
    var users = [];
    try {
        users = await models.users.findAll({});
    } catch (error) {
        console.log(error);
    }
    return users;
}

module.exports = {
    getSingleUser: getSingleUser,
    getAllUser: getAllUser
};
