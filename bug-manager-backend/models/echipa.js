const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const echipa = sequelize.define('echipa',{
    nume_echipa:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    id_echipa:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        unique:true,
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