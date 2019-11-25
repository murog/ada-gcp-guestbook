const knex = require('knex');
const mockKnex = require('mock-knex');
let connection;
const connectToCloudSql = () => {
    const config = {
        user: process.env.DB_USER, // e.g. 'my-user'
        password: process.env.DB_PASS, // e.g. 'my-user-password'
        database: process.env.DB_NAME, // e.g. 'my-database'
    };

    config.host = `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`;

    // Establish a connection to the database
    console.log("connecting to cloudsql...")
    const connection = knex({
        client: 'pg',
        connection: config,
        debug: true
    });

    connection.client.pool.max = 5;
    connection.client.pool.min = 5;
    connection.client.pool.createTimeoutMillis = 30000;
    connection.client.pool.idleTimeoutMillis = 600000;
    connection.client.pool.createRetryIntervalMillis = 200;
    connection.client.pool.acquireTimeoutMillis = 600000;


    return connection;
}

if (process.env.NODE_ENV === 'test') {
    console.log("Using the mock database!")
    connection = knex({ client: 'pg', debug: false });
    mockKnex.mock(connection);
} else {
    connection = connectToCloudSql();
}

module.exports = connection
