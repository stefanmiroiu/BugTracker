import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <div className="card text-center" style={{ maxWidth: '500px', width: '100%' }}>
                <h1 style={{ color: '#2563eb', marginBottom: '15px' }}>Bug Manager</h1>
                <p style={{ marginBottom: '30px', color: '#6b7280' }}>
                    Platforma ideală pentru gestionarea proiectelor și raportarea erorilor în timp real.
                </p>
                <div className="flex-gap" style={{ justifyContent: 'center' }}>
                    <Link to="/login" style={{ width: '100%' }}>
                        <button style={{ width: '100%' }}>Conectare</button>
                    </Link>
                    <Link to="/register" style={{ width: '100%' }}>
                        <button className="secondary" style={{ width: '100%' }}>Înregistrare</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;