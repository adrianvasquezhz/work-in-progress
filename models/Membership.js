const { DataTypes } = require('sequelize');
const { sequelize } = require('../util/sequelize.js')

module.exports = sequelize.define('membership', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
    /* Se le agrego el allowNull al definir la relacion en models/index
       entonces todo este comentario ya no es necesario */

      // userId: {
      //    type: DataTypes.INTEGER,
      //    allowNull: false,
      //    references: {
      //       model: 'users',
      //       key: 'id'                 
      //    },
      // },
      // teamId: {
      //    type: DataTypes.INTEGER,
      //    allowNull: false,
      //    references: {
      //       model: 'teams',
      //       key: 'id'
      //    },
      // }
}, { timestamps: false, underscored: false });