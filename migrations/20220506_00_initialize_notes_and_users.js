const { DataTypes } = require('sequelize');


async function up({ context: queryInterface }) {
   await queryInterface.createTable('notes', {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
      },
      content: {
         type: DataTypes.STRING,
         allowNull: false      
      },
      important: {
         type: DataTypes.BOOLEAN
      },
      date: {
         type: DataTypes.DATE
      }
   });

   await queryInterface.createTable('users', {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
      },
      username: {
         type: DataTypes.STRING,
         unique: true,
         allowNull: false
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false
      }
   });

   await queryInterface.addColumn('notes', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
         model: 'users', // must be table name in the DDBB, not model name
         key: 'id'
      }
   });

}

async function down({ context: queryInterface }) {
   await queryInterface.dropTable('notes');
   await queryInterface.dropTable('users');
}

module.exports = { up, down }