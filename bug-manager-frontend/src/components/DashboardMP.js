import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const DashboardMP = () => {
    const [projects, setProjects] = useState([]);
    const [newProj, setNewProj] = useState({ nume_proiect: '', descriere: '' });
    const teamName = localStorage.getItem('nume_echipa');
    const navigate = useNavigate();

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await api.get('/projects/echipa');
            setProjects(res.data);
        } catch (err) {
            if(err.response?.status === 403) navigate('/login');
        }
    };

    const addProject = async (e) => {
        e.preventDefault();
        try {
            await api.post('/projects', newProj);
            fetchProjects();
            setNewProj({ nume_proiect: '', descriere: '' });
        } catch (err) {
            alert("Eroare la adaugare proiect.");
        }
    };

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ color: '#1e3a8a', margin: 0 }}>Panou Membru Proiect</h1>
                
                <div style={{ 
                    backgroundColor: '#dbeafe', 
                    color: '#1e40af', 
                    padding: '8px 16px', 
                    borderRadius: '20px', 
                    fontWeight: 'bold',
                    border: '1px solid #93c5fd'
                }}>
                    Echipa: {teamName || 'Nespecificată'}
                </div>
            </div>
            
            <div className="card" style={{ borderLeft: '5px solid #2563eb' }}>
                <h3>🚀 Adaugă Proiect Nou</h3>
                <form onSubmit={addProject} style={{ marginTop: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1 }}>
                        <input placeholder="Nume Proiect" value={newProj.nume_proiect} onChange={e => setNewProj({...newProj, nume_proiect: e.target.value})} required style={{ marginBottom: 0 }} />
                    </div>
                    <div style={{ flex: 2 }}>
                        <input placeholder="Descriere scurtă" value={newProj.descriere} onChange={e => setNewProj({...newProj, descriere: e.target.value})} required style={{ marginBottom: 0 }} />
                    </div>
                    <button type="submit">Creează</button>
                </form>
            </div>

            <h3 style={{ marginTop: '30px', marginBottom: '15px' }}>Proiectele Echipei</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {projects.map(p => (
                    <div key={p.id_proiect} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                            <h4 style={{ fontSize: '1.2rem' }}>{p.nume_proiect}</h4>
                            <p style={{ color: '#6b7280', marginBottom: '20px' }}>{p.descriere}</p>
                        </div>
                        <Link to={`/proiect/${p.id_proiect}`}>
                            <button className="secondary" style={{ width: '100%' }}>Gestionează Bug-uri →</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardMP;