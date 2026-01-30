import React from 'react';
import { Donor, AvailabilityStatus } from '../types';
import { Icons } from './Icons';

interface DonorCardProps {
  donor: Donor;
  rank: number;
  onViewDetails: (donor: Donor) => void;
}

const DonorCard: React.FC<DonorCardProps> = ({ donor, rank, onViewDetails }) => {
  
  const getStatusStyles = (status: AvailabilityStatus) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'On Call':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Unavailable':
      default:
        return 'bg-gray-100 text-gray-500 border-gray-200';
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col space-y-3 relative overflow-hidden">
      {/* Decorative side bar based on status */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${
        donor.availabilityStatus === 'Available' ? 'bg-green-500' :
        donor.availabilityStatus === 'On Call' ? 'bg-amber-400' : 'bg-gray-200'
      }`} />

      <div className="flex justify-between items-start pl-2">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 bg-red-50 text-red-700 font-bold text-xl h-12 w-12 rounded-lg flex items-center justify-center border border-red-100">
            {donor.bloodType}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 leading-tight">
              {donor.name}
            </h3>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Icons.MapPin className="w-3.5 h-3.5 mr-1" />
              <span>{donor.distanceMiles.toFixed(1)} miles away</span>
            </div>
          </div>
        </div>
        
        {/* Real-time Status Badge */}
        <div className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full border text-xs font-bold ${getStatusStyles(donor.availabilityStatus)}`}>
          {donor.availabilityStatus === 'Available' && (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
          )}
          {donor.availabilityStatus === 'On Call' && (
             <span className="h-2 w-2 rounded-full bg-amber-500"></span>
          )}
          {donor.availabilityStatus === 'Unavailable' && (
             <span className="h-2 w-2 rounded-full bg-gray-400"></span>
          )}
          <span>{donor.availabilityStatus}</span>
        </div>
      </div>
      
      <div className="pt-2 border-t border-gray-100 flex items-center justify-between pl-2">
        <div className="flex flex-col sm:flex-row sm:items-center text-xs text-gray-500 gap-y-1 sm:gap-x-3">
           <div className="flex items-center">
             <Icons.Clock className="w-3.5 h-3.5 mr-1" />
             <span>Active: {donor.lastStatusUpdate}</span>
           </div>
        </div>
        <button 
          onClick={() => onViewDetails(donor)}
          className="flex items-center space-x-1.5 bg-gray-900 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm"
        >
          <Icons.User className="w-3.5 h-3.5" />
          <span>View Details</span>
        </button>
      </div>
    </div>
  );
};

export default DonorCard;
