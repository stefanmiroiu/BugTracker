const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const proiect = sequelize.define('proiect',{
    nume_proiect:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    id_proiect:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    id_echipa:{
        type:DataTypes.INTEGER,
        allowNull:false

    },
    descriere:{
        type:DataTypes.STRING,
        allowNull:true
    }
    },
    {
        tableName: 'Proiecte'
    }
);

module.exports = proiect;