import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const DashboardTST = () => {
    const [echipe, setEchipe] = useState([]);

    useEffect(() => {
        const fetchEchipe = async () => {
            try {
                const res = await api.get('/projects/echipe');
                setEchipe(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchEchipe();
    }, []);

    const joinProject = async (id_proiect) => {
        try {
            await api.post('/projects/join', { id_proiect });
            alert("Succes! Te-ai alăturat proiectului.");
            window.location.href = `/proiect/${id_proiect}`;
        } catch (err) {
            alert("Eroare: " + err.response?.data?.message);
        }
    };

    return (
        <div className="container">
            <h1 style={{ marginBottom: '20px', color: '#1e3a8a' }}>Panou Tester</h1>
            <p style={{ marginBottom: '30px', color: '#6b7280' }}>Explorează echipele și alătură-te proiectelor pentru a raporta probleme.</p>

            {echipe.map(echipa => (
                <div key={echipa.id_echipa} className="card" style={{ marginBottom: '30px' }}>
                    <h3 style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '10px', marginBottom: '15px' }}>
                        🏢 Echipa: <span style={{ color: '#2563eb' }}>{echipa.nume_echipa}</span>
                    </h3>
                    
                    {echipa.proiects && echipa.proiects.length > 0 ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px' }}>
                            {echipa.proiects.map(proj => (
                                <div key={proj.id_proiect} style={{ background: '#f9fafb', padding: '15px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                                    <strong style={{ fontSize: '1.1rem' }}>{proj.nume_proiect}</strong>
                                    <p style={{ fontSize: '0.9rem', color: '#4b5563', margin: '5px 0 15px 0' }}>{proj.descriere}</p>
                                    <div className="flex-gap">
                                        <button onClick={() => joinProject(proj.id_proiect)} style={{ flex: 1 }}>
                                            Join +
                                        </button>
                                        <Link to={`/proiect/${proj.id_proiect}`} style={{ flex: 1 }}>
                                            <button className="secondary" style={{ width: '100%' }}>Detalii</button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : <p style={{ fontStyle: 'italic', color: '#9ca3af' }}>Această echipă nu are proiecte active.</p>}
                </div>
            ))}
        </div>
    );
};

export default DashboardTST;