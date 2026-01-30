import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BloodType } from '../types';

const SignUp: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        bloodType: '' as BloodType | '',
        locationName: '',
        phoneNumber: '',
        age: '',
        bio: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup, isAuthenticated, loading: authLoading } = useAuth();
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match');
        }
        if (formData.password.length < 6) {
            return setError('Password must be at least 6 characters');
        }
        if (!formData.bloodType) {
            return setError('Please select a blood type');
        }

        setLoading(true);
        try {
            const { email, password, confirmPassword, age, ...additionalData } = formData;
            await signup(email, password, {
                ...additionalData,
                age: parseInt(age) || 0,
                // Initialize other Donor fields
                distanceMiles: 0,
                lastDonationDate: new Date().toISOString().split('T')[0],
                availabilityStatus: 'Available',
                lastStatusUpdate: 'Just now'
            });
            navigate('/');
        } catch (err: any) {
            console.error('Signup error:', err);
            switch (err.code) {
                case 'auth/email-already-in-use':
                    setError('Email is already registered');
                    break;
                case 'auth/invalid-email':
                    setError('Invalid email address');
                    break;
                case 'auth/weak-password':
                    setError('Password is too weak');
                    break;
                default:
                    setError('Failed to create account. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h2>Join as a Donor</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="bloodType">Blood Type</label>
                    <select
                        id="bloodType"
                        name="bloodType"
                        value={formData.bloodType}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded bg-white"
                    >
                        <option value="">Select Blood Type</option>
                        {Object.values(BloodType).map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="locationName">City / Location</label>
                    <input
                        type="text"
                        id="locationName"
                        name="locationName"
                        value={formData.locationName}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                        placeholder="e.g. New York, NY"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        min="18"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength={6}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <button type="submit" disabled={loading} className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700">
                    {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
            </form>
            <p className="mt-4 text-center">Already have an account? <Link to="/login" className="text-red-600">Log In</Link></p>
        </div>
    );
};

export default SignUp;
