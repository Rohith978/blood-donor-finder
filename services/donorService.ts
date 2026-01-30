import { Donor, BloodType } from '../types';
import { MOCK_DONORS } from '../constants';
import { db } from './firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

// Keep mock donors as fallback
const mockDonors: Donor[] = [...MOCK_DONORS];

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
 * Registers a new donor to the in-memory list (for mock data compatibility).
 */
export const registerNewDonor = (donor: Donor): void => {
  mockDonors.push(donor);
};

/**
 * Find donors based on blood type from Firestore.
 * Falls back to mock data if Firestore query fails or returns empty.
 */
export const findDonors = async (bloodType: BloodType, location: string): Promise<Donor[]> => {
  try {
    // Query Firestore for users who are donors with matching blood type
    const usersRef = collection(db, 'users');
    const q = query(
      usersRef,
      where('isDonor', '==', true),
      where('bloodType', '==', bloodType)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // Fallback to mock data if no Firestore donors found
      console.log('No Firestore donors found, using mock data');
      const mockMatches = mockDonors.filter(d => d.bloodType === bloodType);
      return mockMatches.sort((a, b) => a.distanceMiles - b.distanceMiles);
    }

    // Map Firestore documents to Donor type
    const donors: Donor[] = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || 'Anonymous Donor',
        bloodType: data.bloodType,
        distanceMiles: data.distanceMiles || 0,
        locationName: data.locationName || 'Unknown',
        lastDonationDate: data.lastDonationDate || 'Never',
        availabilityStatus: data.availabilityStatus || 'Available',
        lastStatusUpdate: data.lastStatusUpdate || 'Unknown',
        phoneNumber: data.phoneNumber || '',
        email: data.email || '',
        age: data.age || 0,
        bio: data.bio || ''
      } as Donor;
    });

    // Sort by distance (closest first)
    return donors.sort((a, b) => a.distanceMiles - b.distanceMiles);

  } catch (error) {
    console.error('Error fetching donors from Firestore:', error);
    // Fallback to mock data on error
    const mockMatches = mockDonors.filter(d => d.bloodType === bloodType);
    return mockMatches.sort((a, b) => a.distanceMiles - b.distanceMiles);
  }
};

