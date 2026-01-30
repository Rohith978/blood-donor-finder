import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import DonorCard from './components/DonorCard';
import AuthModal from './components/AuthModal';
import DonorDetailModal from './components/DonorDetailModal';
import { Icons } from './components/Icons';
import { Donor, SearchCriteria, SearchStatus, User } from './types';
import { DEFAULT_LOCATION } from './constants';
import { findDonors, registerNewDonor } from './services/donorService';

const USER_STORAGE_KEY = 'blood_donor_app_user';

const App: React.FC = () => {
  // Auth State - initialized from localStorage for persistence
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (savedUser) {
        try {
          return JSON.parse(savedUser);
        } catch (e) {
          console.error("Failed to restore session", e);
        }
      }
    }
    return null;
  });

  // App State
  const [criteria, setCriteria] = useState<SearchCriteria>({
    bloodType: '',
    location: DEFAULT_LOCATION,
  });
  
  const [status, setStatus] = useState<SearchStatus>('idle');
  const [donors, setDonors] = useState<Donor[]>([]);
  
  // Modal State
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);

  // Auth Handlers
  const handleLogin = (name: string) => {
    const loggedInUser: User = {
      name,
      email: `${name.toLowerCase()}@example.com`,
      isDonor: false
    };
    setUser(loggedInUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(loggedInUser));
  };

  const handleRegister = (newDonor: Donor) => {
    // Add to our mock "database"
    registerNewDonor(newDonor);
    
    // Log them in
    const newUser: User = {
      name: newDonor.name,
      email: newDonor.email,
      isDonor: true
    };
    setUser(newUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    setDonors([]);
    setStatus('idle');
    setCriteria({ bloodType: '', location: DEFAULT_LOCATION });
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  // Search Handlers
  const handleSearch = async () => {
    if (!criteria.bloodType) return;

    setStatus('loading');
    setDonors([]);

    try {
      const results = await findDonors(criteria.bloodType, criteria.location);
      setDonors(results);
      setStatus(results.length > 0 ? 'success' : 'empty');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setDonors([]);
    setCriteria(prev => ({ ...prev, bloodType: '' }));
  };

  // If not logged in, show Auth Modal over a blurred background
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 relative">
        <Header user={null} onLogout={() => {}} />
        <div className="blur-sm pointer-events-none h-[calc(100vh-64px)] overflow-hidden">
          <main className="max-w-md mx-auto px-4 py-6 space-y-6 opacity-50">
            <section>
               <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3 px-1">
                 Find Nearby Donors
               </h2>
               <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 h-64"></div>
            </section>
          </main>
        </div>
        <AuthModal onLogin={handleLogin} onRegister={handleRegister} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        
        {/* Search Section */}
        <section>
           <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3 px-1">
             Find Nearby Donors
           </h2>
           <SearchForm 
             criteria={criteria} 
             onCriteriaChange={setCriteria}
             onSearch={handleSearch}
             isLoading={status === 'loading'}
           />
        </section>

        {/* Results Section */}
        {status !== 'idle' && (
          <section className="animate-fade-in-up">
            <div className="flex items-center justify-between mb-3 px-1">
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide">
                Results
              </h2>
              {status === 'success' && (
                <button 
                  onClick={handleReset}
                  className="text-sm text-red-600 font-medium hover:text-red-700"
                >
                  Clear Search
                </button>
              )}
            </div>

            <div className="space-y-3">
              {status === 'loading' && (
                <div className="text-center py-12">
                   <p className="text-gray-400">Searching network...</p>
                </div>
              )}

              {status === 'empty' && (
                <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
                  <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                    <Icons.Search className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">No Donors Found</h3>
                  <p className="text-gray-500 mt-1 text-sm">
                    We couldn't find any {criteria.bloodType} donors near {criteria.location}.
                  </p>
                  <button 
                    onClick={handleReset}
                    className="mt-4 text-red-600 font-medium text-sm hover:underline"
                  >
                    Try a different search
                  </button>
                </div>
              )}

              {status === 'error' && (
                <div className="bg-red-50 rounded-xl p-4 flex items-start space-x-3 border border-red-100">
                  <Icons.AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-red-800">System Error</h3>
                    <p className="text-sm text-red-600 mt-0.5">
                      Unable to fetch donor list at this time. Please try again.
                    </p>
                  </div>
                </div>
              )}

              {status === 'success' && donors.map((donor, index) => (
                <DonorCard 
                  key={donor.id} 
                  donor={donor} 
                  rank={index + 1} 
                  onViewDetails={(d) => setSelectedDonor(d)}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Detail Modal */}
      {selectedDonor && (
        <DonorDetailModal 
          donor={selectedDonor} 
          onClose={() => setSelectedDonor(null)} 
        />
      )}
    </div>
  );
};

export default App;
