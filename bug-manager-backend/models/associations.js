const echipa = require('./echipa');
const utilizator = require('./utilizator');

utilizator.belongsTo(echipa,{foreignKey: 'nume_echipa'});
echipa.hasMany(utilizator,{foreignKey: 'nume_echipa'});

module.exports = {echipa,utilizator};