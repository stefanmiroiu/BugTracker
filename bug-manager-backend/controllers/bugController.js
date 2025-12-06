const bug = require('../models/bug.js');
const proiect = require('../models/proiect.js');
const utilizator = require('../models/utilizator.js');
const { Op } = require('sequelize');

exports.addBug = async (req, res)=>{
    if (req.utilizator.rol !== 'TST') {
        return res.status(403).json({ message: 'Doar Testerii pot raporta bug-uri.' });
    }
    const{id_proiect, id_tst, id_mp, descriere, prioritate, severitate, status,link}=req.body;
    try{
        const bugNou = await bug.create({id_proiect, 
            id_tst, 
            id_mp,
            descriere, 
            prioritate, 
            severitate,
            status, 
            link
        });
        res.status(201).json({message:"Bug inregistrat cu succes.",
            id:bug.id
        });

    }catch(error){
        console.error(error);
        res.status(500).json({message:"Eroare la inregistrare: ", error:error.message})
    }

}

exports.getBugsByProject = async (req, res) => {
    const id_proiect = req.params.id_proiect;
    const rol = req.user.rol;
    const id_echipa = req.user.id_echipa;

    try {
        const bugs = await bug.findAll({
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
    const id_mp = req.utilizator.id;

    try {
        const bug = await bug.findByPk(bugId);
        if (!bug) {
            return res.status(404).json({ message: 'Bug-ul nu a fost găsit.' });
        }
        let updateData = { status: status, link: link || bug.link };

        if (status === 'In lucru') {
            const bug_asignat = await bug.findOne({ 
                where: { id_mp: id_mp, status: 'In lucru' } 
            });
            if ( bug_asignat && bug_asignat.id_bug != id_bug) {
                return res.status(400).json({ message: 'Vă rugăm să finalizați bug-ul curent inainte de a prelua altul.' });
            }
        } 
        
        else if (status === 'Finalizat') {
            if (bug.id_mp && bug.id_mp !== id_mp) {
                return res.status(403).json({ message: 'Doar MP-ul asignat inițial poate marca acest bug.' });
            }
            if (status === 'Finalizat' && !link) {
                bug.id_mp = null;
            }
        }

        await bug.update(updateData);
        res.status(200).json({ message: `Statusul bug-ului ${id_bug} a fost actualizat la ${status}.` });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Eroare la actualizarea statusului.' });
    }
};
