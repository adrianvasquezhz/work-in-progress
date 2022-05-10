const Note = require('./Note');
const User = require('./User');
const Team = require('./Team');
const Membership = require('./Membership');
const UserNotes = require('./UserNotes');


/** 
 * @Note Se definio el nombre del foreign key en las dos primeras relaciones para que no cree dos (la que crea automaticamente sequelize y la que estoy definiendo xq quiero usar una personalizada), ya que estas crean la misma foreign key en notes. 
*/

// Significa, el primary key de users será agregado como foreign key a notes
User.hasMany(Note, { foreignKey: { allowNull: false, name: 'user_id' } });   // permite hace User include Note.....  ademas de crear la foreign key en Note si no se define en el modelo

// Significa, notes tendra un foreign key de la primary key de users
Note.belongsTo(User, { foreignKey: 'user_id' });   // permite hace Note include User .....  ademas de crear la foreign key tbm en Note si no se define en el modelo




// Crea 2 columnas y permite la relacion de User include Team
User.belongsToMany(Team, { through: Membership, foreignKey: { name: 'user_id', allowNull: false } }); // Como esto crea las 2 columnas(userId y teamId) las opciones seteadas acá seran solo para la columna userId.

// Tbm crea las mismas 2 columnas, y permite la relacion de User include Team
Team.belongsToMany(User, { through: Membership, foreignKey: { name: 'team_id', allowNull: false } }); // Las opciones de este serán solo para la columna teamId.




// permite el user include note pero seteando una prop "as": "marked_notes" para que funcione.
User.belongsToMany(Note, { through: UserNotes, as: 'marked_notes' });

Note.belongsToMany(User, { through: UserNotes, as: 'users_marked' })


module.exports = { Note, User, Team, Membership, UserNotes };


// la unica razon por la que escribo User hasMany y note belogsTo es para que sequelize sepa que se relacionan uno con otro y el otro con
// uno, y me permita hacer los include, ya que los dos hacen lo mismo como tal (crear la llave foreanea en notes).
//
// User hasmany or hasOne Note, permite...  User include Note.
// Note belongsTo User, permite... Note include User.
//