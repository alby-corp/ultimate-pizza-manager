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

    this.query = async (query) => {

        const client = this.clientFactory();

        try {

            await client.connect();
            return await client.query(query);

        } catch (err) {
            console.log(err);
        }

        client.end();
    };

    this.execute = async (queries) => {

        const client = this.clientFactory();

        try {
            await client.connect();

            await client.query('BEGIN');

            for(let query of queries){
                await client.query(query);
            }

            await client.query('COMMIT');

        } catch (err) {
            console.log(err);
        }

        client.end();
    };
};

module.exports = new Context();
