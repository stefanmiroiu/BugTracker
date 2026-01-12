import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        nume: '',
        prenume: '',
        mail: '',
        parola: '',
        rol: 'TST',
        nume_echipa: '',
        descriere: ''
    });

    const [teamsList, setTeamsList] = useState([]);
    const [isNewTeam, setIsNewTeam] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await api.get('/auth/teams');
                setTeamsList(response.data);
            } catch (error) {
                console.error("Nu s-au putut incarca echipele", error);
            }
        };
        fetchTeams();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTeamSelect = (e) => {
        const val = e.target.value;
        if (val === "NEW_TEAM_OPTION") {
            setIsNewTeam(true);
            setFormData({ ...formData, nume_echipa: '', descriere: '' });
        } else {
            setIsNewTeam(false);
            setFormData({ ...formData, nume_echipa: val, descriere: '' });
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', formData);
            alert("Cont creat! Te rugam sa te conectezi.");
            navigate('/login');
        } catch (err) {
            alert("Eroare la inregistrare: " + (err.response?.data?.message || err.message));
        }
    };

    return (

        <div style={{ 
            padding: '30px', 
            maxWidth: '450px', 
            margin: '50px auto', 
            backgroundColor: '#fff', 
            borderRadius: '10px', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
        }}>
            <h2 style={{ textAlign: 'center', color: '#1e3a8a', marginBottom: '20px' }}>Înregistrare</h2>
            
            <form onSubmit={handleRegister}>
                <input name="nume" placeholder="Nume" onChange={handleChange} required />
                <input name="prenume" placeholder="Prenume" onChange={handleChange} required />
                <input name="mail" type="email" placeholder="Email" onChange={handleChange} required />
                <input name="parola" type="password" placeholder="Parola" onChange={handleChange} required />
                
                <label style={{fontWeight: 'bold', display: 'block', marginBottom: '5px'}}>Rol:</label>
                <select name="rol" onChange={handleChange} value={formData.rol}>
                    <option value="TST">Tester (TST)</option>
                    <option value="MP">Membru Proiect (MP)</option>
                </select>

                {formData.rol === 'MP' && (
                    <div style={{ 
                        marginTop: '15px', 
                        padding: '15px', 
                        border: '1px solid #e5e7eb', 
                        borderRadius: '8px', 
                        backgroundColor: '#f9fafb' 
                    }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#4b5563' }}>
                            Alege Echipa:
                        </label>
                        
                        <select onChange={handleTeamSelect} style={{ marginBottom: '10px' }}>
                            <option value="">-- Selecteaza o echipa existenta --</option>
                            {teamsList.map(team => (
                                <option key={team.id_echipa} value={team.nume_echipa}>
                                    {team.nume_echipa}
                                </option>
                            ))}
                            <option value="NEW_TEAM_OPTION" style={{ fontWeight: 'bold', color: '#2563eb' }}>
                                + Creeaza o echipa noua
                            </option>
                        </select>

                        {isNewTeam && (
                            <div style={{ marginTop: '10px' }}>
                                <input 
                                    name="nume_echipa" 
                                    placeholder="Nume Echipa Nouă" 
                                    onChange={handleChange} 
                                    required 
                                    style={{ border: '1px solid #2563eb' }}
                                />
                                <input 
                                    name="descriere" 
                                    placeholder="Descriere Echipă" 
                                    onChange={handleChange} 
                                />
                            </div>
                        )}
                    </div>
                )}

                <button type="submit" style={{ width: '100%', marginTop: '20px' }}>Creează Cont</button>
            </form>
        </div>
    );
};

export default Register;