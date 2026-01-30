import React from 'react';
import { Donor, AvailabilityStatus } from '../types';
import { Icons } from './Icons';
import { isEligibleToDonate } from '../services/donorService';

interface DonorDetailModalProps {
  donor: Donor;
  onClose: () => void;
}

const DonorDetailModal: React.FC<DonorDetailModalProps> = ({ donor, onClose }) => {
  
  const isEligible = isEligibleToDonate(donor.lastDonationDate);
  
  const getStatusColor = (status: AvailabilityStatus) => {
    switch (status) {
      case 'Available': return 'text-green-600 bg-green-50 border-green-100';
      case 'On Call': return 'text-amber-600 bg-amber-50 border-amber-100';
      default: return 'text-gray-500 bg-gray-50 border-gray-100';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh]">
        
        {/* Header with Close Button */}
        <div className="bg-red-600 px-6 py-4 flex items-start justify-between shrink-0">
          <div className="text-white">
            <h2 className="text-2xl font-bold">{donor.name}</h2>
            <div className="flex items-center text-red-100 text-sm mt-1">
              <Icons.MapPin className="w-4 h-4 mr-1" />
              {donor.locationName}
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white bg-white/10 p-1 rounded-full transition-colors"
          >
            <Icons.X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* Main Info Grid */}
          <div className="flex items-center justify-between">
             <div className="text-center">
                <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Blood Type</div>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-50 text-red-600 text-2xl font-bold border border-red-100 shadow-sm">
                  {donor.bloodType}
                </div>
             </div>
             <div className="text-center">
                <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Age</div>
                <div className="text-xl font-bold text-gray-900">{donor.age}</div>
             </div>
             <div className="text-center">
                <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Distance</div>
                <div className="text-xl font-bold text-gray-900">{donor.distanceMiles}mi</div>
             </div>
             <div className="text-center">
                <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Status</div>
                <div className={`inline-block px-2.5 py-1.5 text-xs font-bold rounded-lg border ${getStatusColor(donor.availabilityStatus)}`}>
                  {donor.availabilityStatus}
                </div>
             </div>
          </div>
          
          {/* Ineligibility Warning */}
          {!isEligible && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-3 flex items-start gap-3">
              <Icons.AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-red-800">Donation Ineligible</p>
                <p className="text-xs text-red-600 mt-1">
                  This donor gave blood on {donor.lastDonationDate}. Donors must wait 6 months between donations for safety reasons.
                </p>
              </div>
            </div>
          )}

          {/* Bio Section - UPDATED */}
          <div className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200/50">
              <div className="flex items-center text-gray-900 font-semibold text-sm">
                <Icons.FileText className="w-4 h-4 mr-2 text-gray-500" />
                About Donor
              </div>
              <div className="text-xs text-gray-400 bg-white px-2 py-0.5 rounded border border-gray-100 shadow-sm flex items-center">
                 <Icons.Clock className="w-3 h-3 mr-1 text-gray-300" />
                 Updated {donor.lastStatusUpdate}
              </div>
            </div>
            <div className="p-4 max-h-40 overflow-y-auto">
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                  {donor.bio}
                </p>
            </div>
          </div>

          {/* Contact Actions */}
          <div className="grid grid-cols-2 gap-3">
            <a 
              href={`tel:${donor.phoneNumber}`} 
              className={`flex items-center justify-center space-x-2 h-12 rounded-xl font-semibold transition-colors shadow-sm
                ${(donor.availabilityStatus === 'Unavailable' || !isEligible)
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-900 text-white hover:bg-gray-800'}`}
               onClick={e => { if(donor.availabilityStatus === 'Unavailable' || !isEligible) e.preventDefault() }}
            >
              <Icons.Phone className="w-4 h-4" />
              <span>Call Now</span>
            </a>
            <a 
              href={`mailto:${donor.email}`}
              className="flex items-center justify-center space-x-2 bg-white border-2 border-gray-200 text-gray-700 h-12 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <Icons.Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
          </div>

          {/* Footer Meta */}
          <div className="flex items-center justify-center text-xs text-gray-400 space-x-4 border-t border-gray-100 pt-4">
            <span className="flex items-center">
              <Icons.Clock className="w-3 h-3 mr-1" />
              Last Donated: {donor.lastDonationDate}
            </span>
             <span className="flex items-center">
              <Icons.Calendar className="w-3 h-3 mr-1" />
              Registered: 2023
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DonorDetailModal;
