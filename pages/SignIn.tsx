import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, isAuthenticated, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    // Redirect if already authenticated
    useEffect(() => {
        if (!authLoading && isAuthenticated) {
            navigate('/', { replace: true });
        }
    }, [isAuthenticated, authLoading, navigate]);

    // Show loading while checking auth state
    if (authLoading) {
        return (
            <div className="auth-container">
                <p>Checking authentication...</p>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate('/');
        } catch (err: any) {
            console.error('Login error:', err);
            switch (err.code) {
                case 'auth/user-not-found':
                    setError('No account found with this email');
                    break;
                case 'auth/wrong-password':
                    setError('Incorrect password');
                    break;
                case 'auth/invalid-email':
                    setError('Invalid email address');
                    break;
                case 'auth/too-many-requests':
                    setError('Too many attempts. Please try again later.');
                    break;
                case 'auth/invalid-credential':
                    setError('Invalid email or password.');
                    break;
                default:
                    setError('Failed to log in. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h2>Welcome Back</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700">
                    {loading ? 'Logging in...' : 'Log In'}
                </button>
            </form>
            <p className="mt-4 text-center">Don't have an account? <Link to="/signup" className="text-red-600">Sign Up</Link></p>
        </div>
    );
};

export default SignIn;
