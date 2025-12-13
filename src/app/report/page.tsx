import { ReportForm } from "@/components/report/ReportForm";

export default function ReportPage() {
  return (
    <div className="container max-w-2xl py-8 md:py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Report a Sighting</h1>
        <p className="text-muted-foreground mt-2">
          Thank you for helping. Please provide as much detail as possible. All information is handled securely.
        </p>
      </div>
      <ReportForm />
    </div>
  );
}
