import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { placeholderImages } from '@/lib/data';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 text-center bg-primary/10">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                Helping Every Loved One Find Their Way Home
              </h1>
              <p className="max-w-[600px] text-foreground/80 md:text-xl mx-auto">
                A community-powered platform to safely and quickly reunite lost children and family members with their guardians.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2 mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link href="/report" passHref>
                  <Button size="lg" className="w-full">
                    <Users className="mr-2 h-5 w-5" />
                    I've Found Someone
                  </Button>
                </Link>
                <Link href="/search" passHref>
                  <Button size="lg" variant="secondary" className="w-full">
                    <Search className="mr-2 h-5 w-5" />
                    Search for Someone
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">How Reunite Works</h2>
              <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our simple and secure process ensures safety and privacy are the top priorities.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
            <Card className="text-center">
              <CardHeader>
                <CardTitle>1. Report a Sighting</CardTitle>
                <CardDescription>
                  If you find a lost person, create a secure report with their photo, description, and location.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Users className="h-12 w-12 mx-auto text-primary" />
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CardTitle>2. Search Cases</CardTitle>
                <CardDescription>
                  Guardians can search for missing loved ones using filters. All sensitive data is kept private.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Search className="h-12 w-12 mx-auto text-primary" />
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CardTitle>3. Verify & Connect</CardTitle>
                <CardDescription>
                  Submit a claim and get verified by our team. Once approved, we facilitate a safe connection.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-accent"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/10">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
              Your Privacy and Safety are Paramount
            </h2>
            <p className="max-w-[600px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We use state-of-the-art security and privacy measures. Photos are blurred, and personal data is only shared with verified authorities and guardians after a strict approval process.
            </p>
          </div>
          <div className="flex space-x-4">
             <Image
                src={placeholderImages[0].imageUrl}
                width={300}
                height={200}
                alt="Blurred example photo"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center blur-sm"
                data-ai-hint={placeholderImages[0].imageHint}
              />
              <Image
                src={placeholderImages[1].imageUrl}
                width={300}
                height={200}
                alt="Blurred example photo 2"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center blur-sm"
                data-ai-hint={placeholderImages[1].imageHint}
              />
          </div>
        </div>
      </section>
    </div>
  );
}
