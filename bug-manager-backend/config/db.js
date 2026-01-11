const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres', // E mai sigur sa scrii direct 'postgres' daca ai probleme cu variabila, dar si process.env.DB_DIALECT e ok
        
        // MODIFICAREA CRITICA PENTRU AZURE:
        dialectOptions: {
            ssl: {
                require: true, // Cere conexiune criptata
                rejectUnauthorized: false // Accepta certificatul Azure fara validare stricta (necesar pe tier-ul de studenti)
            }
        },
        
        // Repararea warning-ului de logging (true nu mai e valid, folosim false sau console.log)
        logging: false 
    }
)

async function connectionDB(){
    try{
        await sequelize.authenticate();
        console.log("Conexiunea la baza de date a fost stabilita cu succes!");
        
        // Atentie: force: false ca sa nu stearga datele la fiecare restart. 
        // alter: true actualizeaza tabelele daca adaugi coloane noi.
        await sequelize.sync({ alter: true }); 
        
        console.log("Toate modelele au fost sincronizate.");
    }catch(error){
        console.error("Nu s-a putut conecta la baza de date: ", error); // Folosim console.error pentru erori
        // Nu dam process.exit(1) aici pentru ca Azure va crede ca aplicatia a crapat si o va restarta la infinit via CrashLoop. 
        // Mai bine o lasam sa ruleze chiar daca nu are DB, ca sa poti vedea logurile.
    }
}

module.exports = {sequelize, connectionDB};