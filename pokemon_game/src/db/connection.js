const mariadb = require('mariadb');

const config = {
    host: '127.0.0.1',
    user: 'root',
    password: 'r00tP4w0rd',
    database: 'pokemon_game',
    port: 3308,
    conectionLimit: 10,
};


const pool = mariadb.createPool(config);

module.exports = pool;