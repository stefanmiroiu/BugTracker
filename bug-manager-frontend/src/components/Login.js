import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const Login = ({ onLoginSuccess }) => {
    const [mail, setMail] = useState('');
    const [parola, setParola] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { mail, parola });
            localStorage.setItem('token', response.data.token);
            const numeComplet = `${response.data.nume} ${response.data.prenume}`;
            localStorage.setItem('userNume', numeComplet);
            const payload = JSON.parse(atob(response.data.token.split('.')[1]));
            localStorage.setItem('rol', payload.rol);
            localStorage.setItem('nume_echipa', response.data.nume_echipa)
            if(onLoginSuccess) onLoginSuccess();

            if (payload.rol === 'MP') navigate('/dashboard-mp');
            else navigate('/dashboard-tst');

        } catch (err) {
            setError('Date incorecte sau eroare server.');
        }
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', paddingTop: '50px' }}>
            <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center" style={{ marginBottom: '20px' }}>Bine ai revenit!</h2>
                <h2 className="text-center" style={{ marginBottom: '20px' }}>TESTER/MP</h2>
                {error && <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '10px', borderRadius: '6px', marginBottom: '15px', fontSize: '0.9rem' }}>{error}</div>}
                <form onSubmit={handleLogin}>
                    <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#4b5563' }}>Email</label>
                    <input type="email" value={mail} onChange={e => setMail(e.target.value)} required />
                    
                    <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#4b5563' }}>Parolă</label>
                    <input type="password" value={parola} onChange={e => setParola(e.target.value)} required />
                    
                    <button type="submit" style={{ width: '100%', marginTop: '10px' }}>Intră în cont</button>
                </form>
                <p className="text-center" style={{ marginTop: '15px', fontSize: '0.9rem' }}>
                    Nu ai cont? <Link to="/register" style={{ color: '#2563eb', fontWeight: '600' }}>Înregistrează-te</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;