import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import DashboardMP from './components/DashboardMP';
import DashboardTST from './components/DashboardTST';
import ProjectDetails from './components/ProjectDetails';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [rol, setRol] = useState(localStorage.getItem('rol'));
  const [numeUser, setNumeUser] = useState(localStorage.getItem('userNume') || '');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    setRol(localStorage.getItem('rol'));
    setNumeUser(localStorage.getItem('userNume') || '');
  }, [isAuthenticated]); 

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setRol(null);
    setNumeUser('');
    window.location.href = '/login';
  };

  const handleLoginSuccess = () => {
      setIsAuthenticated(true);
      setRol(localStorage.getItem('rol'));
      setNumeUser(localStorage.getItem('userNume')); 
  };

  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <nav className="navbar">
            <div className="container nav-content">
                {isAuthenticated ? (
                    <span className="logo" style={{ cursor: 'default' }}>🛡️ Bug Manager</span>
                ) : (
                    <Link to="/" className="logo">🛡️ Bug Manager</Link>
                )}
                
                <div className="flex-gap" style={{ alignItems: 'center' }}>
                    {!isAuthenticated ? (
                        <>
                            <Link to="/login"><button style={{ background: 'rgba(255,255,255,0.2)' }}>Conectare</button></Link>
                            <Link to="/register"><button style={{ background: 'white', color: '#1e3a8a' }}>Înregistrare</button></Link>
                        </>
                    ) : (
                        <>
                            
                            <span style={{ marginRight: '15px', fontWeight: 'bold', fontSize: '0.9rem' }}>
                                👋 Bine ai venit, {numeUser}!
                            </span>

                            {rol === 'MP' ? 
                                <Link to="/dashboard-mp"><button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.3)' }}>Dashboard MP</button></Link> : 
                                <Link to="/dashboard-tst"><button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.3)' }}>Dashboard TST</button></Link>
                            }
                            <button onClick={logout} className="danger">Logout</button>
                        </>
                    )}
                </div>
            </div>
        </nav>

        <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={isAuthenticated ? <Navigate to={rol === 'MP' ? "/dashboard-mp" : "/dashboard-tst"} /> : <Home />} />
              <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard-mp" element={<DashboardMP />} />
              <Route path="/dashboard-tst" element={<DashboardTST />} />
              <Route path="/proiect/:id" element={<ProjectDetails />} />
            </Routes>
        </div>

        <footer style={{ background: '#1f2937', color: '#9ca3af', textAlign: 'center', padding: '20px', marginTop: '40px' }}>
            <p>&copy; 2025 Echipa NovaWeb - Proiect Tehnologii Web</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;