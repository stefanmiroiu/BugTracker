const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const echipa = sequelize.define('echipa',{
    nume_echipa:{
        type:DataTypes.STRING,
        primaryKey:true,
        unique:true,
        allowNull:false
    },
    id_echipa:{
        type:DataTypes.INTEGER,
        autoIncrement:true
    },
    descriere:{
        type:DataTypes.STRING,
        allowNull:false
    }
    },
    {
        tableName: 'Echipe'
    },
);
module.exports = echipa;