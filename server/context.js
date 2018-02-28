const pg = require('pg');

const Context = function () {

    this.connectionString = {           // const config_PROD = process.env.DATABASE_URL;
        host: 'albiberto.ddns.net',
        user: 'teamYOOX',
        password: '$cSmG6fn',
        database: 'ultimate_pizza_manager',
        port: 5432,
        ssl: false
    };

    this.clientFactory = () => new pg.Client(this.connectionString);

    this.execute = async (query) => {

        const client = this.clientFactory();

        try {

            await client.connect();
            return await client.query(query);

        } catch (err) {
            console.log(err);
        }

        client.end();
    }
};

module.exports.context = new Context();
