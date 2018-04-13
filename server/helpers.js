class Helpers {

    static async makeResponse(res, func) {
        try {
            res.status(200);
            const data = await func();
            res.send(data);
        } catch (error) {
            res.status(500);
            res.send(error);
        }
    };
}

module.exports = Helpers;