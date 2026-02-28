import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('/verify-auth');
                console.log('Auth response:', response.data);
                setUser(response.data.user);
            } catch (err) {
                console.error('Auth error:', err.response?.data || err.message);
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await axios.post('/logout');
            navigate('/login');
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    if (loading) {
        return <div style={{ color: 'white' }}>Loading...</div>;
    }

    if (!user) {
        return (
            <div className="dashboard-container">
                <h1 className="dashboard-title">Error loading user data</h1>
                <p className="dashboard-user">Please try logging in again.</p>
                <button onClick={() => navigate('/login')} className="logout-btn">
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Welcome, {user.username}!</h1>
            <p className="dashboard-user">You are successfully logged in.</p>
            <button onClick={handleLogout} className="logout-btn">
                Logout
            </button>
        </div>
    );
}

export default Dashboard;
