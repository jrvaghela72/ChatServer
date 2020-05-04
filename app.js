const express = require('express');
const app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);
const socketServer = require('./socket/server')
const Cors = require("cors");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
var userAuthentication = require("./routes/authentication");
var user = require("./routes/user");
const jwt_authentication = require("./module/jwt_authentication");

app.use(Cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

var models = require("./models");

app.use(jwt_authentication);
app.use("/auth", userAuthentication);
app.use("/user", user);


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
models.sequelize
    .sync()
    .then(function () {
        models.sequelize.options.logging = false;
        http.listen(3000, function () {
            console.log('Server is running.. on Port'+ 3000);
            console.log('Calling socket');            
            socketServer(io);
        });
    })
    .catch(err => {
        console.log(err);
    });