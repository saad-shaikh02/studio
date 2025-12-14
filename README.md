# LostLink: A Community-Powered Reunification Platform

LostLink is a modern web application designed to be a central, trusted platform for safely and rapidly reuniting lost individuals—primarily children and vulnerable adults—with their families and guardians.

## The Mission

When a loved one goes missing, every second counts. LostLink aims to shorten the agonizing time of separation by creating a direct, secure, and private link between the person who finds someone and the person who is searching. It replaces fragmented, insecure social media posts with a single, purpose-built platform that prioritizes **speed, privacy, and user safety**.

## Key Features

- **Secure Sighting Reports**: A user who finds a lost person can quickly submit a secure report with details like a photo, description, and location.
- **Privacy-First Design**: To protect the identity of the found individual, all case photos are **automatically blurred** on the public-facing site.
- **Controlled Information Access**: The finder's contact details are stored privately and are only shared with a guardian after they have gone through a secure verification process.
- **Case Claim & Verification System**: A guardian can "claim" a case that matches their loved one, initiating a verification workflow. Once approved, contact information is securely revealed to facilitate a reunion.
- **AI-Powered Summaries**: The app leverages Generative AI to produce concise summaries of case details, helping administrators or verified parties quickly understand the situation.
- **Modern, Responsive Interface**: Built with Next.js and Tailwind CSS, the app is fully responsive and offers a clean, intuitive user experience on desktop, tablet, and mobile devices. It includes both light and dark themes.
- **Instant Emergency Access**: A prominent emergency button is always visible in the header, providing a one-click way to contact local authorities.

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI Components**: ShadCN UI
- **Styling**: Tailwind CSS
- **Generative AI**: Google's Genkit
- **Deployment**: Configured for Firebase App Hosting

## Getting Started

To explore the application, you can start with the main page at `src/app/page.tsx`. From there, you can navigate to the key user journeys:

- **Report a Sighting**: `/report`
- **Search for Cases**: `/search`
