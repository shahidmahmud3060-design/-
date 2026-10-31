export type Language = 'bn' | 'en';
export type ThemeMode = 'light' | 'dark' | 'theme-blue';

export type MahfilStatus = 'pending' | 'approved' | 'rejected';
export type SpeakerStatus = 'approved' | 'pending';

export interface Speaker {
  id: string;
  nameBn: string;
  nameEn: string;
  alternativeSpellings?: string[];
  titleBn?: string;
  titleEn?: string;
  country: 'Bangladesh' | 'India';
  division?: string;
  district: string;
  photoUrl?: string;
  biographyBn: string;
  biographyEn: string;
  isVerified: boolean;
  status: SpeakerStatus;
  phone?: string;
  phonePubliclyApproved?: boolean;
  isIndiaGuest?: boolean;
  documentedVisitOrInvite?: string;
}

export interface Mahfil {
  id: string;
  title: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  startTime: string; // e.g. "14:00"
  endTime: string; // e.g. "23:00"
  division: string;
  district: string;
  upazila: string;
  union?: string;
  ward?: string;
  fullAddress: string;
  googleMapsUrl?: string;
  principalSpeaker: Speaker;
  secondSpeaker?: Speaker;
  thirdSpeaker?: Speaker;
  specialSpeaker?: Speaker;
  specialAttraction?: string;
  organizerName: string;
  organizerPhone: string;
  posterUrl: string;
  status: MahfilStatus;
  rejectionReason?: string;
  submittedByUserId: string;
  submittedByUserName: string;
  createdAt: string;
  likesCount?: number;
  featured?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
  phone?: string;
  isPhoneVerified: boolean;
  isAdmin: boolean;
}

export interface Announcement {
  id: string;
  titleBn: string;
  titleEn: string;
  contentBn: string;
  contentEn: string;
  date: string;
  priority: 'normal' | 'important';
}

export interface AuditLog {
  id: string;
  action: string;
  targetId: string;
  targetType: 'mahfil' | 'speaker' | 'announcement';
  adminEmail: string;
  timestamp: string;
  details?: string;
}

export interface DeletionRequest {
  id: string;
  mahfilId: string;
  mahfilTitle: string;
  requestedByUserId: string;
  requestedByUserName: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}
