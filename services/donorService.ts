import { Donor, BloodType } from '../types';
import { MOCK_DONORS } from '../constants';

// In-memory storage for the session
let currentDonors: Donor[] = [...MOCK_DONORS];

/**
 * Checks if a donor is eligible based on the 6-month rule.
 * Returns true if lastDonationDate is 'Never' or > 6 months ago.
 */
export const isEligibleToDonate = (lastDonationDate: string): boolean => {
  if (!lastDonationDate || lastDonationDate === 'Never') return true;
  
  const lastDate = new Date(lastDonationDate);
  // Check if date is valid
  if (isNaN(lastDate.getTime())) return true; // Default to true if invalid date string

  const today = new Date();
  const sixMonthsAgo = new Date(today.setMonth(today.getMonth() - 6));
  
  return lastDate <= sixMonthsAgo;
};

/**
 * Registers a new donor to the in-memory list.
 */
export const registerNewDonor = (donor: Donor): void => {
  currentDonors.push(donor);
};

/**
 * Simulates an API call to find donors based on criteria.
 */
export const findDonors = async (bloodType: BloodType, location: string): Promise<Donor[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Filter by blood type strictly
      const matches = currentDonors.filter(d => d.bloodType === bloodType);
      
      // Sort by distance (closest first)
      const sortedMatches = matches.sort((a, b) => a.distanceMiles - b.distanceMiles);
      
      resolve(sortedMatches);
    }, 600); // 600ms simulated delay
  });
};
