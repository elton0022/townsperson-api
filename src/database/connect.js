const knex = require('knex');
require('dotenv/config');

const connection = knex({
    client: 'pg',
    connection: process.env.DB_URL
});

module.exports = connection;