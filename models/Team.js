const { DataTypes } = require('sequelize');
const { sequelize } = require('../util/sequelize.js')

module.exports = sequelize.define('team', {
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
}, { timestamps: false, underscored: true });