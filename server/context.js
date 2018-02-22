const pg = require('pg');

const Context = function () {

    this.connectionString = {           // const config_PROD = process.env.DATABASE_URL;
        host: 'localhost',
        user: 'teamYOOX',
        password: 'we<3YOOX',
        database: 'ultimate_pizza_manager',
        port: 5432,
        ssl: false
    };

    this.clientFactory = () => new pg.Client(this.connectionString);

    this.execute = async (query) => {

        const client = this.clientFactory();

        await client.connect(err => {
            if (err) throw err;
        });

        try {
            return await client.query(query);
        } catch (err) {
            console.log(err);
        }

        client.end();
    }
};

module.exports.context = new Context();
