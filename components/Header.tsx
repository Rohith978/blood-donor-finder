import React from 'react';
import { Icons } from './Icons';
import { User } from '../types';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10 safe-top">
      <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-red-600">
          <div className="bg-red-100 p-2 rounded-lg">
            <Icons.Droplet className="w-6 h-6 fill-current" />
          </div>
          <h1 className="text-lg font-bold tracking-tight text-gray-900">
            Blood Donor Finder
          </h1>
        </div>
        
        {user ? (
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
              <Icons.User className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-xs font-semibold text-gray-700 truncate max-w-[80px]">
                {user.name}
              </span>
            </div>
            <button 
              onClick={onLogout}
              className="text-xs font-medium text-red-600 hover:text-red-800"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
            Guest
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
