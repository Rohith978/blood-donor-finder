import React, { useState } from 'react';
import { Icons } from './Icons';
import { BLOOD_TYPES } from '../constants';
import { BloodType, Donor } from '../types';
import { isEligibleToDonate } from '../services/donorService';

interface AuthModalProps {
  onLogin: (name: string) => void;
  onRegister: (donor: Donor) => void;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  phone?: string;
  bloodType?: string;
  location?: string;
  age?: string;
  bio?: string;
  lastDonation?: string;
}

const AuthModal: React.FC<AuthModalProps> = ({ onLogin, onRegister }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');

  // Register State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regBloodType, setRegBloodType] = useState<BloodType | ''>('');
  const [regLocation, setRegLocation] = useState('');
  const [regAge, setRegAge] = useState('');
  const [regBio, setRegBio] = useState('');
  const [regLastDonation, setRegLastDonation] = useState('');

  const validateRegister = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    // Name Validation
    if (!regName.trim()) {
      newErrors.name = 'Full name is required';
      isValid = false;
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regEmail.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(regEmail)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Phone Validation (Allows +, -, (), space, and digits. Min 10 chars)
    const phoneRegex = /^[\d\s\-()+]{10,}$/;
    if (!regPhone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!phoneRegex.test(regPhone)) {
      newErrors.phone = 'Valid phone number required (min 10 digits)';
      isValid = false;
    }

    // Blood Type Validation
    if (!regBloodType) {
      newErrors.bloodType = 'Selection required';
      isValid = false;
    }

    // Age Validation
    const ageNum = parseInt(regAge);
    if (!regAge) {
      newErrors.age = 'Required';
      isValid = false;
    } else if (isNaN(ageNum)) {
      newErrors.age = 'Must be a number';
      isValid = false;
    } else if (ageNum < 18 || ageNum > 75) {
      newErrors.age = 'Must be 18-75';
      isValid = false;
    }

    // Location Validation
    if (!regLocation.trim()) {
      newErrors.location = 'Location is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail) return;
    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
      onLogin(loginEmail.split('@')[0]); // Use part of email as name for demo
      setIsLoading(false);
    }, 800);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateRegister()) {
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      // Check 6-month rule
      const isEligible = isEligibleToDonate(regLastDonation);
      const computedStatus = isEligible ? 'Available' : 'Unavailable';
      const computedBio = isEligible 
        ? regBio 
        : `[System Note: Currently ineligible due to recent donation on ${regLastDonation}] ${regBio}`;

      const newDonor: Donor = {
        id: Math.random().toString(36).substr(2, 9),
        name: regName,
        bloodType: regBloodType as BloodType,
        distanceMiles: 0.1, // Mock distance for new user (implies they are "here")
        locationName: regLocation,
        lastDonationDate: regLastDonation || 'Never',
        availabilityStatus: computedStatus,
        lastStatusUpdate: 'Just now',
        phoneNumber: regPhone,
        email: regEmail,
        age: parseInt(regAge),
        bio: computedBio || 'New donor to the community.'
      };
      
      onRegister(newDonor);
      setIsLoading(false);
    }, 1000);
  };

  // Helper to get input classes based on error state
  const getInputClass = (errorKey?: string) => `
    block w-full h-11 px-4 rounded-lg border transition-colors outline-none text-sm
    ${errorKey 
      ? 'border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50 pr-10' 
      : 'border-gray-300 focus:ring-2 focus:ring-red-500 bg-white'}
  `;

  // Helper to render input with label and error icon
  const renderInput = (
    label: string,
    value: string,
    onChange: (val: string) => void,
    error?: string,
    type: string = 'text',
    placeholder?: string,
    note?: string
  ) => (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <input
          type={type}
          className={getInputClass(error)}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none animate-pulse">
            <Icons.AlertCircle className="h-5 w-5 text-red-500" />
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1 flex items-center gap-1">{error}</p>}
      {note && !error && <p className="text-xs text-gray-500">{note}</p>}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Inject custom animation styles */}
      <style>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-scale {
          animation: fadeInScale 0.2s ease-out forwards;
        }
      `}</style>

      {/* Backdrop */}
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" />

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Segmented Control Header */}
        <div className="p-4 pb-0">
          <div className="bg-gray-100 p-1 rounded-xl flex">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 ${
                activeTab === 'login' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 ${
                activeTab === 'register' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Join as Donor
            </button>
          </div>
        </div>

        {/* Scrollable Form Area */}
        <div className="p-6 overflow-y-auto">
          
          {activeTab === 'login' ? (
            <div key="login" className="space-y-6 animate-fade-scale">
              <div className="text-center space-y-2">
                 <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto">
                   <Icons.Droplet className="w-8 h-8 text-red-600" />
                 </div>
                 <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
                 <p className="text-gray-500 text-sm">Sign in to manage your donor profile.</p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {renderInput("Email Address", loginEmail, setLoginEmail, undefined, "email", "you@example.com")}
                {renderInput("Password", loginPass, setLoginPass, undefined, "password", "••••••••")}
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all shadow-lg shadow-gray-200 mt-2 flex items-center justify-center transform active:scale-[0.98]"
                >
                  {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" /> : 'Sign In'}
                </button>
              </form>
            </div>
          ) : (
            <div key="register" className="animate-fade-scale">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">Create Donor Profile</h2>
                <p className="text-sm text-gray-500">Your details help hospitals connect with you instantly.</p>
              </div>

              <form onSubmit={handleRegisterSubmit} className="space-y-6">
                
                {/* Section: Personal Details */}
                <div className="space-y-4">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-1">
                    Personal Details
                  </div>
                  
                  {renderInput("Full Name", regName, setRegName, errors.name, "text", "e.g. John Doe")}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700">Blood Type</label>
                      <div className="relative">
                        <select
                          className={`${getInputClass(errors.bloodType)}`}
                          value={regBloodType}
                          onChange={e => setRegBloodType(e.target.value as BloodType)}
                        >
                          <option value="">Select</option>
                          {BLOOD_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                        {errors.bloodType && (
                           <div className="absolute inset-y-0 right-6 pr-2 flex items-center pointer-events-none">
                              <Icons.AlertCircle className="h-5 w-5 text-red-500 animate-pulse" />
                           </div>
                        )}
                      </div>
                      {errors.bloodType && <p className="text-red-500 text-xs mt-1 flex items-center gap-1">{errors.bloodType}</p>}
                    </div>
                    {renderInput("Age", regAge, setRegAge, errors.age, "number", "18-75")}
                  </div>
                </div>

                {/* Section: Donation History */}
                <div className="space-y-4">
                   <div className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-1">
                    Donation History
                  </div>
                  {renderInput(
                    "Last Donation Date", 
                    regLastDonation, 
                    setRegLastDonation, 
                    errors.lastDonation, 
                    "date", 
                    undefined, 
                    "Leave empty if you have never donated before. Must be >6 months ago to be eligible."
                  )}
                </div>

                {/* Section: Contact Info */}
                <div className="space-y-4">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-1">
                    Contact Information
                  </div>

                  {renderInput("Email Address", regEmail, setRegEmail, errors.email, "email", "you@example.com")}
                  {renderInput("Phone Number", regPhone, setRegPhone, errors.phone, "tel", "(555) 000-0000")}
                  {renderInput("Current Location", regLocation, setRegLocation, errors.location, "text", "City or Neighborhood")}
                </div>

                {/* Section: Additional */}
                <div className="space-y-4">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-1">
                     Bio / Notes
                  </div>
                   <div className="space-y-1.5">
                    <textarea
                      className="block w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none resize-none text-sm bg-white"
                      rows={2}
                      placeholder="Briefly describe your availability..."
                      value={regBio}
                      onChange={e => setRegBio(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-200 mt-2 flex items-center justify-center transform active:scale-[0.98]"
                >
                  {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" /> : 'Complete Registration'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
