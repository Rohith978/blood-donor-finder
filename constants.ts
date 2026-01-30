import { BloodType, Donor } from './types';

export const DEFAULT_LOCATION = "Central Hospital Area";

export const BLOOD_TYPES: BloodType[] = [
  BloodType.A_POS,
  BloodType.A_NEG,
  BloodType.B_POS,
  BloodType.B_NEG,
  BloodType.AB_POS,
  BloodType.AB_NEG,
  BloodType.O_POS,
  BloodType.O_NEG,
];

// Mock data with extended details
export const MOCK_DONORS: Donor[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    bloodType: BloodType.O_POS,
    distanceMiles: 0.4,
    locationName: 'North Wing Apartments',
    lastDonationDate: '2023-10-15',
    availabilityStatus: 'Available',
    lastStatusUpdate: 'Just now',
    phoneNumber: '(555) 123-4567',
    email: 'sarah.j@example.com',
    age: 29,
    bio: 'Regular donor, happy to help in emergencies. Available weekends and evenings.'
  },
  {
    id: '2',
    name: 'Michael Chen',
    bloodType: BloodType.A_POS,
    distanceMiles: 0.8,
    locationName: 'Downtown Lofts',
    lastDonationDate: '2023-11-02',
    availabilityStatus: 'On Call',
    lastStatusUpdate: '15 mins ago',
    phoneNumber: '(555) 234-5678',
    email: 'm.chen@example.com',
    age: 34,
    bio: 'Work from home, usually available during the day. Can travel within 5 miles.'
  },
  {
    id: '3',
    name: 'David Smith',
    bloodType: BloodType.O_NEG,
    distanceMiles: 1.2,
    locationName: 'Westside Community',
    lastDonationDate: '2023-09-20',
    availabilityStatus: 'Unavailable',
    lastStatusUpdate: '1 hr ago',
    phoneNumber: '(555) 345-6789',
    email: 'dsmith@example.com',
    age: 41,
    bio: 'Universal donor. Please contact only for urgent cases.'
  },
  {
    id: '4',
    name: 'Emily Davis',
    bloodType: BloodType.O_POS,
    distanceMiles: 1.5,
    locationName: 'University District',
    lastDonationDate: '2023-12-01',
    availabilityStatus: 'Available',
    lastStatusUpdate: '5 mins ago',
    phoneNumber: '(555) 456-7890',
    email: 'emily.d@example.com',
    age: 22,
    bio: 'Student at City University. Free on Tuesday and Thursday afternoons.'
  },
  {
    id: '5',
    name: 'James Wilson',
    bloodType: BloodType.AB_NEG,
    distanceMiles: 2.1,
    locationName: 'Suburban Heights',
    lastDonationDate: '2023-08-15',
    availabilityStatus: 'On Call',
    lastStatusUpdate: '30 mins ago',
    phoneNumber: '(555) 567-8901',
    email: 'j.wilson@example.com',
    age: 45,
    bio: 'Experienced donor. Have my own transport.'
  },
  {
    id: '6',
    name: 'Jessica Garcia',
    bloodType: BloodType.A_NEG,
    distanceMiles: 0.3,
    locationName: 'Medical Center Plaza',
    lastDonationDate: '2023-11-20',
    availabilityStatus: 'Available',
    lastStatusUpdate: 'Just now',
    phoneNumber: '(555) 678-9012',
    email: 'jess.g@example.com',
    age: 28,
    bio: 'Nurse nearby, can donate on short notice.'
  },
  {
    id: '7',
    name: 'Robert Martinez',
    bloodType: BloodType.B_POS,
    distanceMiles: 3.5,
    locationName: 'East River Housing',
    lastDonationDate: '2023-10-05',
    availabilityStatus: 'Unavailable',
    lastStatusUpdate: '2 days ago',
    phoneNumber: '(555) 789-0123',
    email: 'rob.m@example.com',
    age: 38,
    bio: 'Available after 6 PM on weekdays.'
  },
  {
    id: '8',
    name: 'Linda Anderson',
    bloodType: BloodType.O_NEG,
    distanceMiles: 0.9,
    locationName: 'Parkview Estate',
    lastDonationDate: '2023-12-10',
    availabilityStatus: 'Available',
    lastStatusUpdate: 'Just now',
    phoneNumber: '(555) 890-1234',
    email: 'linda.a@example.com',
    age: 52,
    bio: 'Universal donor. Committed to saving lives.'
  },
  {
    id: '9',
    name: 'William Thomas',
    bloodType: BloodType.AB_POS,
    distanceMiles: 1.8,
    locationName: 'Tech Park Residence',
    lastDonationDate: '2023-11-15',
    availabilityStatus: 'On Call',
    lastStatusUpdate: '10 mins ago',
    phoneNumber: '(555) 901-2345',
    email: 'will.t@example.com',
    age: 31,
    bio: 'Can commute quickly to the city center.'
  },
  {
    id: '10',
    name: 'Elizabeth Jackson',
    bloodType: BloodType.B_NEG,
    distanceMiles: 2.4,
    locationName: 'Garden City',
    lastDonationDate: '2023-09-10',
    availabilityStatus: 'Unavailable',
    lastStatusUpdate: '4 hrs ago',
    phoneNumber: '(555) 012-3456',
    email: 'beth.j@example.com',
    age: 26,
    bio: 'First time donor this year, eager to help.'
  }
];
