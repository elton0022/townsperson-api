const path = require('path');
require('dotenv/config');
module.exports = {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
    },
    seeds: { directory: path.resolve(__dirname, 'src', 'database', 'seeds') },
}