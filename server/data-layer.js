const db = require('./context');

const usersQuery = "SELECT * FROM muppet";

const getFoodQuery = "SELECT * FROM food";

function Context() {
    this.getUsers = () => db.context.execute(usersQuery);

    this.getFoods = () => {
        db.context.execute(getFoodQuery);
    };
}

module.exports.context = new Context();