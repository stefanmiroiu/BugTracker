const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        
        
       // dialectOptions: {
         //   ssl: {
           //    require: true, 
             //  rejectUnauthorized: false
            //}
        //},
        
        logging: false 
    }
)

async function connectionDB(){
    try{
        await sequelize.authenticate();
        console.log("Conexiunea la baza de date a fost stabilita cu succes!");
        
        await sequelize.sync({ alter: true }); 
        
        console.log("Toate modelele au fost sincronizate.");
    }catch(error){
        console.error("Nu s-a putut conecta la baza de date: ", error);
    }
}

module.exports = {sequelize, connectionDB};