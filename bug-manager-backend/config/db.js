const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host:process.env.DB_HOST,
        dialect:process.env.DB_DIALECT,
        logging: true
    }
)

async function connectionDB(){
    try{
        await sequelize.authenticate();
        console.log("Conexiunea la baza de date a fost stabilita cu succes!");
        await sequelize.sync();
        console.log("Toate modelele au fost sincronizate.");
    }catch(error){
        console.log("Nu s-a putut conecta la baza de date: ",error);
        process.exit(1);
    }
    
}

module.exports = {sequelize, connectionDB};