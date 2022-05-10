const { DataTypes, Model, where } = require('sequelize');
const { sequelize } = require('../util/sequelize.js');

class Note extends Model {

   whatUser = () => {
      return this.getUser().then(res => res)
   }
   
   static ads = () => {
      Note.findOne()
   }
}

module.exports = Note.init({
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
}, { sequelize, timestamps: false, modelName: 'note' })