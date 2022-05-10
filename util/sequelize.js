const { Sequelize } = require('sequelize');
const { DB_URL } = process.env;
const { Umzug, SequelizeStorage } = require('umzug');

const sequelize = new Sequelize(DB_URL, { logging: false });

const optionsMigrator = {
   migrations: {
      glob: 'migrations/*.js'
   },
   storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
   context: sequelize.getQueryInterface(),
   logger: console
}

const runMigrations = async () => {
   const migrator = new Umzug(optionsMigrator)

   const migrations = await migrator.up();
   console.log('Migrations up to date', { files: migrations.map(mig => mig.name) })
}

const rollbackMigrations = async () => {
   const migrator = new Umzug(optionsMigrator);
   await migrator.down();
}


module.exports = { sequelize, runMigrations, rollbackMigrations };