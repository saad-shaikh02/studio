export type CaseStatus = 'open' | 'pending_verification' | 'resolved' | 'claim_approved';

export type CaseReport = {
  id: string;
  status: CaseStatus;
  photoUrl: string;
  photoHint: string;
  approximateAge: string;
  gender: 'male' | 'female' | 'other' | 'unknown';
  locationFound: string;
  timeFound: string; // ISO 8601 format
  description: string;
  clothing: string;
  identifyingFeatures: string;
  finder: {
    name: string;
    contact: string; // e.g., phone or email
  };
  claimant?: {
    name: string;
    contact: string;
    verificationDocs: string;
  };
};
