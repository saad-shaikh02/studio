# **App Name**: Reunite

## Core Features:

- Finder Report Submission: Allow finders to submit detailed reports including photos, descriptions, and locations of found individuals. The case is stored in Firestore and is assigned a unique ID.
- Parent/Guardian Search: Enable parents/guardians to search for missing individuals using filters like age, location, and physical features. Access Firestore for this information.
- Claim Verification: Implement an admin verification process for claim requests, ensuring only verified parents/guardians gain access. Store information in Firestore.
- Location-Based Alerts: Send location-based notifications to nearby users about reported missing or found individuals. Utilize Firestore.
- AI-Powered Face Matching (Tool): Use AI to automatically suggest potential matches between missing and found reports. The AI acts as a tool by only surfacing information to users and admins after they've authenticated successfully. No personal data can be viewed until access is explicitly granted by an admin.
- Secure Image Handling: Blur/hide sensitive information in photos until verified access is granted.
- Case Resolution & Record Keeping: Securely store case details, communications, and verification records in Firestore. Once a case is resolved, the information is flagged appropriately.

## Style Guidelines:

- Primary color: Soft blue (#64B5F6) to evoke a sense of calm and trust.
- Background color: Very light blue (#E3F2FD), a desaturated shade of the primary color, for a clean and unobtrusive background.
- Accent color: Gentle green (#81C784), analogous to blue, to indicate successful matches and verifications.
- Body and headline font: 'PT Sans' (sans-serif) for a modern and accessible user experience.
- Code font: 'Source Code Pro' for any code snippets or IDs that need to be displayed.
- Use clear, universal icons for navigation and key actions, with a focus on safety and ease of use.
- Maintain a clean and intuitive layout with a focus on prioritizing key information.
- Subtle animations for transitions and feedback to enhance usability without causing distraction.