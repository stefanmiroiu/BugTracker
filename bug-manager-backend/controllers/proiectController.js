const proiect = require('../models/proiect');
const echipa = require('../models/echipa'); 
const { Op } = require('sequelize'); 

exports.getAllTeamsWithProjects = async (req, res) => {
    try {
        const echipe = await echipa.findAll({
            attributes: ['id_echipa', 'nume_echipa'], 
            include: [{
                model: proiect,
                attributes: ['id_proiect', 'nume_proiect', 'descriere']
            }]
        });

        res.status(200).json(teams);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Eroare la obținerea echipelor cu proiecte.', error: error.message });
    }
};

exports.getMyTeamProjects = async (req, res) => {
    const id_echipa = req.utilizator.id_echipa; 

    if (!id_echipa || req.utilizator.rol !== 'MP') {
        return res.status(403).json({ message: 'Acces interzis. Nu sunteți asociat unei echipe.' });
    }

    try {
        const proiecte = await proiect.findAll({
            where: { id_echipa: id_echipa }, 
            attributes: ['id_proiect', 'nume_proiect', 'descriere']
        });

        res.status(200).json(proiecte);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Eroare la obținerea proiectelor echipei.' });
    }
};

exports.addProject = async (req, res) => {
    if (req.utilizator.rol !== 'MP' || !req.utilizator.id_echipa) {
        return res.status(403).json({ message: 'Doar membrii de proiect asociați unei echipe pot adăuga proiecte.' });
    }

    const { nume_proiect, descriere } = req.body;
    const id_echipa = req.utilizator.id_echipa; 

    try {
        if (!nume_proiect || !descriere) {
            return res.status(400).json({ message: 'Numele și descrierea proiectului sunt obligatorii.' });
        }
        
        const proiectNou = await proiect.create({
            nume_proiect,
            descriere,
            id_echipa: id_echipa 
        });

        res.status(201).json({ message: 'Proiect adăugat cu succes.'});
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
             return res.status(400).json({ message: 'Un proiect cu acest nume există deja.' });
        }
        console.error(error);
        res.status(500).json({ message: 'Eroare la adăugarea proiectului.', error: error.message });
    }
};