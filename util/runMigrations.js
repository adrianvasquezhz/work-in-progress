const { runMigrations } = require('./sequelize.js');

/**
 * Esto es para ejecutarlo desde cli,
 * primero hacer esto:
 * @IN_WINDOWS
 * SET DB_URL=postgres://gnwedwdu:DPKmNJUKyvI7LWN1z4ZHxh-M-7Ks07Dm@chunee.db.elephantsql.com/gnwedwdu
 *
 * @IN_MAC and unity systems i think
 * NODE_ENV DB_URL=postgres://gnwedwdu:DPKmNJUKyvI7LWN1z4ZHxh-M-7Ks07Dm@chunee.db.elephantsql.com/gnwedwdu
*/

runMigrations();