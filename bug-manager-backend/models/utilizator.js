const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const utilizator = sequelize.define('utilizator',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nume:{
        type:DataTypes.STRING,
        allowNull:false
    },
    prenume:{
        type:DataTypes.STRING,
        allowNull:false
    },
    mail:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{isEmail:true}
    },
    parola:{
        type:DataTypes.STRING,
        allowNull:false
    },
    rol:{
        type:DataTypes.ENUM('MP', 'TST'),
        allowNull:false
    },
    nume_echipa:{
        type:DataTypes.STRING,
        allowNull:true
    },
    id_echipa:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    status:{
        type:DataTypes.ENUM('LIBER', 'OCUPAT'),
        defaultValue:'LIBER'
    }
},


    {
        tableName: 'Utilizatori'
    },
  
);
module.exports = utilizator;