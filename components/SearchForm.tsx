import React from 'react';
import { BloodType, SearchCriteria } from '../types';
import { BLOOD_TYPES } from '../constants';
import { Icons } from './Icons';

interface SearchFormProps {
  criteria: SearchCriteria;
  onCriteriaChange: (c: SearchCriteria) => void;
  onSearch: () => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ 
  criteria, 
  onCriteriaChange, 
  onSearch,
  isLoading 
}) => {
  
  const handleBloodTypeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onCriteriaChange({ ...criteria, bloodType: e.target.value as BloodType });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCriteriaChange({ ...criteria, location: e.target.value });
  };

  const isFormValid = criteria.bloodType !== '' && criteria.location.trim().length > 0;

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 space-y-4">
      
      {/* Blood Type Selection */}
      <div className="space-y-1.5">
        <label htmlFor="bloodType" className="block text-sm font-semibold text-gray-700">
          Blood Type <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            id="bloodType"
            value={criteria.bloodType}
            onChange={handleBloodTypeSelect}
            className="block w-full h-12 pl-4 pr-10 text-base border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 bg-gray-50"
          >
            <option value="" disabled>Select Type</option>
            {BLOOD_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
            <Icons.ChevronRight className="w-5 h-5 rotate-90" />
          </div>
        </div>
      </div>

      {/* Location Input */}
      <div className="space-y-1.5">
        <label htmlFor="location" className="block text-sm font-semibold text-gray-700">
          Search Location
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Icons.MapPin className="w-5 h-5" />
          </div>
          <input
            type="text"
            id="location"
            value={criteria.location}
            onChange={handleLocationChange}
            placeholder="Enter city or area"
            className="block w-full h-12 pl-10 pr-4 text-base border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 bg-gray-50"
          />
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={onSearch}
        disabled={!isFormValid || isLoading}
        className={`
          w-full h-14 mt-2 flex items-center justify-center space-x-2 rounded-lg text-lg font-bold transition-all
          ${isFormValid && !isLoading 
            ? 'bg-red-600 text-white hover:bg-red-700 shadow-md shadow-red-200' 
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
        `}
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Finding Donors...</span>
          </>
        ) : (
          <>
            <Icons.Search className="w-5 h-5" />
            <span>Find Donors</span>
          </>
        )}
      </button>
    </div>
  );
};

export default SearchForm;
