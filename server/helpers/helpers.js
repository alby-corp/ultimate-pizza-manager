/**
 * Class Helpers.
 */

class Helpers {

    static async makeResponse(res, func) {
        try {
            res.status(200);

            let data = await func();
            res.send(data ? data : []);

        } catch (error) {
            res.status(500).end();
        }
    };

    /**
     * Normalize a port into a number, string, or false.
     */

    static normalizePort(val) {
        const port = parseInt(val, 10);

        if (isNaN(port)) {
            // named pipe
            return val;
        }

        if (port >= 0) {
            // port number
            return port;
        }

        return false;
    }

    /**
     * Event listener for HTTP server "error" event.
     */

    static onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(`Port requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`Port is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * Event listener for HTTP server "listening" event.
     */

    static onListening(server, name) {
        return () => {
            var addr = server.address();
            var bind = typeof addr === 'string'
                ? 'pipe: ' + addr
                : 'port: ' + addr.port;
            console.log(`${name} listening on ${bind}`);
        }
    }
}

module.exports = Helpers;