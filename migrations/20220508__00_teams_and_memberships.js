const { DataTypes } = require('sequelize');

// queryInterface runs sql pure
async function up({ context: queryInterface }) {
   await queryInterface.createTable('teams', {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
      },
      name: {
         type: DataTypes.TEXT,
         allowNull: false,
         unique: true
      }
   });

   await queryInterface.createTable('memberships', {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
      },
      user_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: {
            model: 'users', // must be table name in the DDBB, not model name
            key: 'id',
         }
      },
      team_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: {
            model: 'teams', // must be table name in the DDBB, not model name
            key: 'id'
         }
      }
   })
}

async function down({ context: queryInterface }) {
   await queryInterface.dropTable('teams');
   await queryInterface.dropTable('memberships');
}

module.exports = { up, down }