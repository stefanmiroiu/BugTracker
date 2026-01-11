const echipa = require('./echipa');
const utilizator = require('./utilizator');
const proiect = require('./proiect');

utilizator.belongsTo(echipa,{foreignKey: 'id_echipa'});
echipa.hasMany(utilizator,{foreignKey: 'id_echipa'});

echipa.hasMany(proiect, { foreignKey: 'id_echipa' });
proiect.belongsTo(echipa, { foreignKey: 'id_echipa' });


utilizator.belongsToMany(proiect, { through: 'TesterProiecte', as: 'proiecteTestate', foreignKey: 'id_utilizator' });
proiect.belongsToMany(utilizator, { through: 'TesterProiecte', as: 'testeri', foreignKey: 'id_proiect' });

module.exports = {echipa, utilizator, proiect};