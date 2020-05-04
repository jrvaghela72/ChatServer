var jwt = require("jsonwebtoken");

module.exports = function (io) {
    io.use(function (socket, next) {
        console.log('in io.use function');
        if (socket.handshake.query && socket.handshake.query.token) {
            jwt.verify(socket.handshake.query.token, '132sdfwec@@3432278', function (err, decoded) {
                if (err) return next(new Error('Socket Authentication error'));
                socket.decoded = decoded;
                next();
            });
        } else {
            next(new Error('Socket Authentication error'));
        }
    });

    io.on('connection', async function (socket) {
        console.log('************************** Socket Connected **************************');
        

        socket.on('disconnect', async () => {
            console.log('************************** Socket Disconnected **************************');

            //Get user's room and leave all room as user is no more connected
            
        });
    });
}