import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Register = () => {
    const [formData, setFormData] = useState({
        nume: '', prenume: '', mail: '', parola: '', rol: 'TST', nume_echipa: '', descriere: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <h2>Înregistrare</h2>
            <form onSubmit={handleRegister}>
                <input name="nume" placeholder="Nume" onChange={handleChange} required style={{ display: 'block', width: '100%', marginBottom: '10px' }} />
                <input name="prenume" placeholder="Prenume" onChange={handleChange} required style={{ display: 'block', width: '100%', marginBottom: '10px' }} />
                <input name="mail" type="email" placeholder="Email" onChange={handleChange} required style={{ display: 'block', width: '100%', marginBottom: '10px' }} />
                <input name="parola" type="password" placeholder="Parola" onChange={handleChange} required style={{ display: 'block', width: '100%', marginBottom: '10px' }} />
                
                <label>Rol:</label>
                <select name="rol" onChange={handleChange} value={formData.rol} style={{ display: 'block', width: '100%', marginBottom: '10px' }}>
                    <option value="TST">Tester (TST)</option>
                    <option value="MP">Manager Proiect (MP)</option>
                </select>

                {formData.rol === 'MP' && (
                    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                        <p>Detalii Echipă (Selectare sau Creare)</p>
                        <input name="nume_echipa" placeholder="Numele Echipei" onChange={handleChange} required style={{ display: 'block', width: '100%', marginBottom: '5px' }} />
                        <input name="descriere" placeholder="Descriere Echipă (optional)" onChange={handleChange} style={{ display: 'block', width: '100%' }} />
                    </div>
                )}

                <button type="submit">Creează Cont</button>
            </form>
        </div>
    );
};

export default Register;