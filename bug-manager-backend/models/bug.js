const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const bug = sequelize.define('bug',{
    id_bug:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    id_proiet:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    id_tst:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    id_mp:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    descriere:{
        type:DataTypes.STRING,
        allowNull:false
    },
    severitate:{
        type:DataTypes.ENUM('Blocant', 'Critic', 'Major', 'Minor', 'Trivial')
    },
    prioritate:{
        type:DataTypes.ENUM('Urgent', 'Mare', 'Medie', 'Mica')
    },
    link:{
        type:DataTypes.STRING,
        validate:{isUrl:true},
    }
    },
    {
        tableName: 'Buguri'
    }
);

module.exports = bug;