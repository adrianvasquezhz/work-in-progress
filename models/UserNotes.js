const { DataTypes } = require('sequelize');
const { sequelize } = require('../util/sequelize.js');

module.exports = sequelize.define('user_notes', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
         model: 'users',
         key: 'id'
      }
   },
   noteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
         model: 'notes',
         key: 'id '
      }
   }
}, { timestamps: false, underscored: true })