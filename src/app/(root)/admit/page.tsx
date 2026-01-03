import { SearchRollNumber } from "@/components/SearchRollNumber";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export default function Page() {
  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="mb-8 border-b-2 border-primary pb-4 text-center md:text-left">
          <h1 className="text-2xl font-bold uppercase tracking-tight text-primary md:text-3xl">
            Examination Portal
          </h1>
          <p className="text-sm font-medium text-muted-foreground">
            Download Admit Card for the 24th Mathematics Aptitude Test-2026
          </p>
        </div>
        <Suspense
          fallback={<Loader2 className="mx-auto size-4 animate-spin" />}
        >
          <SearchRollNumber />
        </Suspense>
      </div>
    </main>
  );
}
