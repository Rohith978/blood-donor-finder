export enum BloodType {
  A_POS = "A+",
  A_NEG = "A-",
  B_POS = "B+",
  B_NEG = "B-",
  AB_POS = "AB+",
  AB_NEG = "AB-",
  O_POS = "O+",
  O_NEG = "O-",
}

export type AvailabilityStatus = 'Available' | 'Unavailable' | 'On Call';

export interface Donor {
  id: string;
  name: string;
  bloodType: BloodType;
  distanceMiles: number;
  locationName: string;
  lastDonationDate: string;
  availabilityStatus: AvailabilityStatus;
  lastStatusUpdate: string; // e.g. "Just now", "2 hrs ago"
  // New detailed fields
  phoneNumber: string;
  email: string;
  age: number;
  bio: string;
}

export interface User {
  name: string;
  email: string;
  isDonor: boolean;
}

export interface SearchCriteria {
  bloodType: BloodType | '';
  location: string;
}

export type SearchStatus = 'idle' | 'loading' | 'success' | 'empty' | 'error';
