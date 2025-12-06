const echipa = require('./echipa');
const utilizator = require('./utilizator');
const proiect = require('./proiect');


utilizator.belongsTo(echipa,{foreignKey: 'nume_echipa'});
echipa.hasMany(utilizator,{foreignKey: 'nume_echipa'});
echipa.hasMany(proiect, {
    foreignKey: 'id_echipa', 
});
proiect.belongsTo(echipa, {
    foreignKey: 'id_echipa',
});

module.exports = {echipa,utilizator, proiect};