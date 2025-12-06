const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const utilizator = require('../models/utilizator.js');
const echipa = require('../models/echipa.js');

exports.register = async (req, res)=>{
    const{nume, prenume, mail, parola, rol,nume_echipa, descriere}=req.body;
    let id_echipa = null;
    try{
        if(rol=="MP"){
            const echipaExistenta = await echipa.findOne({where:{nume_echipa}});
        
            if(echipaExistenta){
            return res.status(400).json({message:"Echipa deja exista! Selectati-o din lista."});
            }
        else{
            const echipaNoua = await echipa.create({nume_echipa,
                descriere
            });
            id_echipa = echipaNoua.id_echipa;
        }
        }
        const utilizatorExistent = await utilizator.findOne({where:{mail}});
        if(utilizatorExistent){
            return res.status(400).json({message:"Acest email este deja inregistrat"});
        }else{
            const salt = await bcrypt.genSalt(10);
            const hashedParola = await bcrypt.hash(parola, salt);

            const utilizatorNou = await utilizator.create({nume,
                prenume,
                mail,
                parola:hashedParola,
                rol,
                nume_echipa:rol==='MP' ? nume_echipa:null,
                id_echipa:rol==='MP' ? id_echipa:null
                });
        }
        res.status(201).json({message:"Utilizator inregistrat cu succes.",
            id:utilizator.id
        });

    }catch(error){
        console.error(error);
        res.status(500).json({message:"Eroare la inregistrare: ", error:error.message})
    }
}


//LOG-IN---------------

exports.login = async(req, res)=>{
    const{mail, parola}=req.body;
    try{
        const utilizatorLogare = await utilizator.findOne({where:{mail}});
        if(!utilizatorLogare){
            return res.status(404).json({message:"Utilizatorul nu exista!"});
        }
        const potrivire = await bcrypt.compare(utilizatorLogare.parola, parola);
        if(!potrivire){
            return res.status(401).json({message:"Parola este gresita!"});
        }
        const token = jwt.sign(
            {id:utilizator.id,
            rol:utilizator.rol,
            nume_echipa:utilizator.nume_echipa
            }, JWT_SECRET, {expiresIn:'1h'}
        )
        res.status(200).json({token, message:"Conectare reusita."});
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Eroare la logare: ", error:error.message})
    }
}