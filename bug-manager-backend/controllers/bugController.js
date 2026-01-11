const Bug = require('../models/bug.js');
const Proiect = require('../models/proiect.js');
const utilizator = require('../models/utilizator.js');
const { Op } = require('sequelize');

exports.addBug = async (req, res)=>{
    if (req.utilizator.rol !== 'TST') {
        return res.status(403).json({ message: 'Doar Testerii pot raporta bug-uri.' });
    }
    const{id_proiect, descriere, prioritate, severitate,link}=req.body;
    const id_tst = req.utilizator.id;
    try{
        const bugNou = await Bug.create({
            id_proiect, 
            id_tst, 
            id_mp: null,
            descriere, 
            prioritate, 
            severitate,
            status: 'Nou', 
            link
        });
        res.status(201).json({message:"Bug inregistrat cu succes.",
            id:bugNou.id_bug
        });

    }catch(error){
        console.error(error);
        res.status(500).json({message:"Eroare la inregistrare: ", error:error.message})
    }

}

exports.getBugsByProject = async (req, res) => {
    const id_proiect = req.params.id_proiect;

    try {
        const bugs = await Bug.findAll({
            where: { id_proiect: id_proiect },
            order: [['prioritate', 'DESC'], ['severitate', 'DESC']],
        });
        res.status(200).json(bugs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Eroare la obținerea bug-urilor.' });
    }
};

exports.updateBugStatus = async (req, res) => {
    if (req.utilizator.rol !== 'MP') {
        return res.status(403).json({ message: 'Doar Membrii de Proiect pot actualiza statusul.' });
    }

    const id_bug = req.params.id_bug;
    const { status, link } = req.body;
    const id_mp_curent = req.utilizator.id;

    try {
        const foundBug = await Bug.findByPk(id_bug);
        if (!foundBug) {
            return res.status(404).json({ message: 'Bug-ul nu a fost găsit.' });
        }
        
        let updateData = { status: status };
        if(link) updateData.link = link;

        if (status === 'In lucru') {
        
            const bug_asignat = await Bug.findOne({ 
                where: { id_mp: id_mp_curent, status: 'In lucru' } 
            });
            
            if ( bug_asignat && bug_asignat.id_bug != id_bug) {
                return res.status(400).json({ message: 'Vă rugăm să finalizați bug-ul curent inainte de a prelua altul.' });
            }
            
            updateData.id_mp = id_mp_curent;

            await utilizator.update({ status: 'OCUPAT' }, { where: { id: id_mp_curent } });
        } 
        
        else if (status === 'Finalizat') {
            if (foundBug.id_mp && foundBug.id_mp !== id_mp_curent) {
                return res.status(403).json({ message: 'Doar MP-ul asignat inițial poate marca acest bug ca finalizat.' });
            }

            await utilizator.update({ status: 'LIBER' }, { where: { id: id_mp_curent } });
        }

        await foundBug.update(updateData);
        res.status(200).json({ message: `Statusul bug-ului ${id_bug} a fost actualizat la ${status}.` });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Eroare la actualizarea statusului.', error: error.message });
    }
};