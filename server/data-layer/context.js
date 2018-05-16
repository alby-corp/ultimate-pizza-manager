const pg = require('pg');

const Context = (function () {
    const privateProps = new WeakMap();

    class Context {
        constructor(connectionString) {
            privateProps.set(this, {
                connectionString: connectionString
            });
        };

        get connectionString() {
            return privateProps.get(this).connectionString;
        };

        clientFactory() {
            return new pg.Client(this.connectionString)
        }

        async query(query) {

            const client = this.clientFactory();

            try {
                await client.connect();
                return await client.query(query);
            } catch (error) {
                console.log(`ERROR: ${error}`);
                throw error;
            } finally {
                client.end();
            }
        };

        async scalar(query) {

            const client = this.clientFactory();

            try {

                await client.connect();
                return (await client.query({text: query, rowMode: 'array'})).rows[0][0];

            } catch (error) {
                console.log(`ERROR: ${error}`);
                throw error;
            } finally {
                client.end();
            }
        };

        async execute (queries) {

            const client = this.clientFactory();

            try {
                await client.connect();

                await client.query('BEGIN');

                for (let query of queries) {
                    await client.query(query);
                }

            } catch (error) {
                console.log(`ERROR: ${err}`);

                await client.query('ROLLBACK');
                client.end();
            }

            await client.query('COMMIT');
            client.end();
        };

    };

    return Context;
})();

module.exports = Context;
