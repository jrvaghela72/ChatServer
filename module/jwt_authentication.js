var jwt = require("jsonwebtoken");

var verifyToken = function (req, res, next) {
    console.log('Authenticating user');
    var response = {};
    if (
        req.url == "/auth/login" ||
        req.url == "/auth/signup"
    ) {
        return next();
    } else {
        const bearerHeader = req.headers["authorization"];
        if (bearerHeader) {
            const bearer = bearerHeader.split(" ");
            const bearerToken = bearer[1];
            req.token = bearerToken;
            jwt.verify(
                req.token,
                '132sdfwec@@3432278',
                (err, decoded) => {
                    if (err) {
                        req.authenticated = false;
                        req.decoded = null;
                        response.message = 'invalid credentials';
                        res.status(401).send(response);
                    } else {
                        req.decoded = decoded;
                        req.authenticated = true;
                        next();
                    }
                }
            );
        } else {
            response.message = 'invalid credentials';
            return res
                .status(401)
                .send(response.message);
        }
    }
};

module.exports = verifyToken;
