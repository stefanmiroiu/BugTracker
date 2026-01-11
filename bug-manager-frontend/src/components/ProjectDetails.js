import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

const ProjectDetails = () => {
    const { id } = useParams();
    const [bugs, setBugs] = useState([]);
    const [rol, setRol] = useState(localStorage.getItem('rol'));
    
    const [newBug, setNewBug] = useState({ descriere: '', severitate: 'Minor', prioritate: 'Mica', link: '' });
    const [editBugId, setEditBugId] = useState(null);
    const [statusUpdate, setStatusUpdate] = useState({ status: '', link: '' });

    useEffect(() => {
        fetchBugs();
    }, [id]);

    const fetchBugs = async () => {
        try {
            const res = await api.get(`/bugs/proiect/${id}`);
            setBugs(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddBug = async (e) => {
        e.preventDefault();
        try {
            await api.post('/bugs/addBug', { ...newBug, id_proiect: id });
            setNewBug({ descriere: '', severitate: 'Minor', prioritate: 'Mica', link: '' });
            fetchBugs();
        } catch (err) {
            alert("Eroare la adăugare bug.");
        }
    };

    const handleUpdateStatus = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/bugs/${editBugId}/status`, statusUpdate);
            setEditBugId(null);
            fetchBugs();
        } catch (err) {
            alert(err.response?.data?.message || "Eroare update.");
        }
    };

    return (
        <div className="container">
            <h2 style={{ marginBottom: '20px', color: '#1e3a8a' }}>Bug Tracker - Proiect #{id}</h2>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                
                {/* Coloana Stanga: Formular (doar TST) sau Info */}
                <div style={{ flex: 1, minWidth: '300px' }}>
                    {rol === 'TST' ? (
                        <div className="card" style={{ borderTop: '5px solid #ef4444' }}>
                            <h3>🐞 Raportează Bug</h3>
                            <form onSubmit={handleAddBug} style={{ marginTop: '15px' }}>
                                <label>Descriere problemă</label>
                                <textarea rows="3" value={newBug.descriere} onChange={e => setNewBug({...newBug, descriere: e.target.value})} required />
                                
                                <label>Link (Commit/Screenshot)</label>
                                <input value={newBug.link} onChange={e => setNewBug({...newBug, link: e.target.value})} />
                                
                                <div className="flex-gap">
                                    <div style={{ flex: 1 }}>
                                        <label>Severitate</label>
                                        <select value={newBug.severitate} onChange={e => setNewBug({...newBug, severitate: e.target.value})}>
                                            <option>Trivial</option><option>Minor</option><option>Major</option><option>Critic</option><option>Blocant</option>
                                        </select>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label>Prioritate</label>
                                        <select value={newBug.prioritate} onChange={e => setNewBug({...newBug, prioritate: e.target.value})}>
                                            <option>Mica</option><option>Medie</option><option>Mare</option><option>Urgent</option>
                                        </select>
                                    </div>
                                </div>

                                <button type="submit" style={{ width: '100%', marginTop: '10px' }}>Raportează</button>
                            </form>
                        </div>
                    ) : (
                        <div className="card">
                            <h3>Info Manager</h3>
                            <p style={{ color: '#6b7280' }}>Gestionează statusul bug-urilor raportate de testeri. Asigură-te că link-urile de soluționare sunt valide.</p>
                        </div>
                    )}
                </div>

                {/* Coloana Dreapta: Lista Bug-uri */}
                <div style={{ flex: 2, minWidth: '300px' }}>
                    {bugs.length === 0 ? <div className="card text-center"><p>Niciun bug raportat. Totul e curat! 🎉</p></div> : null}
                    
                    {bugs.map(bug => (
                        <div key={bug.id_bug} className="card" style={{ padding: '20px', borderLeft: bug.status === 'Finalizat' ? '5px solid #10b981' : (bug.status === 'In lucru' ? '5px solid #f59e0b' : '5px solid #3b82f6') }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                                <span className={`badge badge-${bug.status.replace(' ', '_')}`}>{bug.status}</span>
                                <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>ID: {bug.id_bug}</span>
                            </div>
                            
                            <h4 style={{ marginBottom: '5px', fontWeight: '500' }}>{bug.descriere}</h4>
                            
                            <div style={{ display: 'flex', gap: '15px', fontSize: '0.9rem', color: '#4b5563', margin: '10px 0' }}>
                                <span>⚠️ Severitate: <strong>{bug.severitate}</strong></span>
                                <span>🔥 Prioritate: <strong>{bug.prioritate}</strong></span>
                            </div>

                            {bug.link && <a href={bug.link} target="_blank" rel="noreferrer" style={{ color: '#2563eb', fontSize: '0.9rem', display: 'block', marginBottom: '15px' }}>🔗 Vezi Link Referință</a>}

                            {/* Zona de Editare pentru MP */}
                            {rol === 'MP' && (
                                <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px dashed #e5e7eb' }}>
                                    {editBugId === bug.id_bug ? (
                                        <form onSubmit={handleUpdateStatus} style={{ background: '#f9fafb', padding: '15px', borderRadius: '6px' }}>
                                            <label>Schimbă Status</label>
                                            <select onChange={e => setStatusUpdate({...statusUpdate, status: e.target.value})} required>
                                                <option value="">Selectează...</option>
                                                <option value="In lucru">In lucru</option>
                                                <option value="Finalizat">Finalizat</option>
                                            </select>
                                            {statusUpdate.status === 'Finalizat' && (
                                                <input placeholder="Link Commit Solutie (GitHub)" onChange={e => setStatusUpdate({...statusUpdate, link: e.target.value})} style={{ marginTop: '10px' }} />
                                            )}
                                            <div className="flex-gap" style={{ marginTop: '10px' }}>
                                                <button type="submit" style={{ flex: 1 }}>Salvează</button>
                                                <button type="button" className="secondary" onClick={() => setEditBugId(null)} style={{ flex: 1 }}>Anulează</button>
                                            </div>
                                        </form>
                                    ) : (
                                        <button className="secondary" onClick={() => {
                                            setEditBugId(bug.id_bug);
                                            setStatusUpdate({ status: '', link: '' });
                                        }} style={{ width: '100%', fontSize: '0.9rem' }}>Modifică Status / Soluționează</button>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;