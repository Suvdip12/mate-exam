import { SearchRollNumber } from "@/components/SearchRollNumber";
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
            Government of Education & Examination Services
          </p>
        </div>
        <Suspense fallback={null}>
          <SearchRollNumber />
        </Suspense>
      </div>
    </main>
  );
}
