import knex from 'knex';
require('dotenv/config');

const connection = knex({
    client: 'pg',
    connection: process.env.DB_URL
});

export default connection;