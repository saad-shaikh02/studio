import type { CaseReport } from './types';
import placeholderData from './placeholder-images.json';

export const placeholderImages = placeholderData.placeholderImages;

// This is a mock database. In a real application, you would use Firestore.
export const cases: CaseReport[] = [
  {
    id: 'case-001',
    status: 'open',
    photoUrl: placeholderImages[0].imageUrl,
    photoHint: placeholderImages[0].imageHint,
    approximateAge: '4-6',
    gender: 'male',
    locationFound: 'Central Park, New York',
    timeFound: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    description: 'Found near the carousel, seems distressed and is non-verbal.',
    clothing: 'Red t-shirt with a dinosaur print, blue shorts.',
    identifyingFeatures: 'Small scar above left eyebrow.',
    finder: {
      name: 'Jane Doe',
      contact: 'jane.doe@email.com',
    },
  },
  {
    id: 'case-002',
    status: 'pending_verification',
    photoUrl: placeholderImages[1].imageUrl,
    photoHint: placeholderImages[1].imageHint,
    approximateAge: '7-9',
    gender: 'female',
    locationFound: 'Grand Central Station',
    timeFound: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    description: 'She was looking for her mom near the ticket counters. Knows her first name is "Lily".',
    clothing: 'Pink jacket, jeans, and white sneakers.',
    identifyingFeatures: 'Freckles across her nose.',
    finder: {
      name: 'John Smith',
      contact: 'john.smith@email.com',
    },
    claimant: {
      name: 'Sarah Miller',
      contact: 'sarah.miller@email.com',
      verificationDocs: 'Birth Certificate and Family Photo provided.'
    }
  },
  {
    id: 'case-003',
    status: 'resolved',
    photoUrl: placeholderImages[2].imageUrl,
    photoHint: placeholderImages[2].imageHint,
    approximateAge: '13-15',
    gender: 'male',
    locationFound: 'Times Square',
    timeFound: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    description: 'Separated from his school group. Was very calm and provided his parents\' phone number.',
    clothing: 'Blue hoodie with "NYC" on it, black pants.',
    identifyingFeatures: 'Wears braces.',
    finder: {
      name: 'Officer Davis',
      contact: 'NYPD 12th Precinct',
    },
  },
  {
    id: 'case-004',
    status: 'open',
    photoUrl: placeholderImages[3].imageUrl,
    photoHint: placeholderImages[3].imageHint,
    approximateAge: '65-75',
    gender: 'female',
    locationFound: 'Main Street Mall',
    timeFound: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    description: 'Appears confused and cannot remember her name or where she lives. She mentioned the name "Arthur".',
    clothing: 'Light blue cardigan, floral dress.',
    identifyingFeatures: 'Wears a distinctive silver locket.',
    finder: {
      name: 'Mall Security',
      contact: 'security@mainstreetmall.com',
    },
  },
  {
    id: 'case-005',
    status: 'open',
    photoUrl: placeholderImages[4].imageUrl,
    photoHint: placeholderImages[4].imageHint,
    approximateAge: '3-4',
    gender: 'female',
    locationFound: 'Summer Music Festival',
    timeFound: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    description: 'Found crying near the main stage. Can say her name is "Mia".',
    clothing: 'Yellow sundress and a sun hat.',
    identifyingFeatures: 'Missing a front tooth.',
    finder: {
      name: 'Event Staff',
      contact: 'lostandfound@summerfest.com',
    },
  }
];

// --- Mock Service Functions ---

export async function getCases(): Promise<CaseReport[]> {
  // In a real app, this would be a Firestore query
  return Promise.resolve(cases);
}

export async function getCaseById(id: string): Promise<CaseReport | undefined> {
  // In a real app, this would be a Firestore doc read
  return Promise.resolve(cases.find((c) => c.id === id));
}

export async function addCase(report: Omit<CaseReport, 'id' | 'status' | 'timeFound'>): Promise<CaseReport> {
  const newCase: CaseReport = {
    id: `case-${String(Date.now()).slice(-6)}`,
    status: 'open',
    timeFound: new Date().toISOString(),
    ...report,
  };
  cases.unshift(newCase);
  return Promise.resolve(newCase);
}

export async function addClaim(caseId: string, claimant: CaseReport['claimant']): Promise<CaseReport | undefined> {
  const caseToUpdate = cases.find(c => c.id === caseId);
  if (caseToUpdate) {
    caseToUpdate.status = 'pending_verification';
    caseToUpdate.claimant = claimant;
    return Promise.resolve(caseToUpdate);
  }
  return Promise.resolve(undefined);
}

export async function approveClaim(caseId: string): Promise<CaseReport | undefined> {
  const caseToUpdate = cases.find(c => c.id === caseId);
  if (caseToUpdate) {
    caseToUpdate.status = 'claim_approved';
    return Promise.resolve(caseToUpdate);
  }
  return Promise.resolve(undefined);
}

export async function resolveCase(caseId: string): Promise<CaseReport | undefined> {
    const caseToUpdate = cases.find(c => c.id === caseId);
    if (caseToUpdate) {
      caseToUpdate.status = 'resolved';
      return Promise.resolve(caseToUpdate);
    }
    return Promise.resolve(undefined);
}
