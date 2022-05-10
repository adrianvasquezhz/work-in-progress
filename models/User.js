const { DataTypes, Op } = require('sequelize');
const { sequelize } = require('../util/sequelize.js');


module.exports = sequelize.define('user', {
   username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
   },
   name: {
      type: DataTypes.STRING,
      allowNull: false
   },
   admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
   },
   disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
   }
}, 
   {
      freezeTableName: false,
      timestamps: false,

      defaultScope: {
         where: {
            disabled: false
         }
      },

      scopes: {
         admin: {
            where: {
               admin: true
            }
         },

         disabled: (boolean) => {
            return {
               where: {
                  disabled: boolean
               }
            }
         },

         disabledNormal: {
            where: {
               disabled: {
                  [Op.eq]: false
               }
            }
         }
      }
   }
);