"use client";

import NavBar from "@/components/NavBar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { papers } from "@/lib/data/question-data";
import { downloadFile, getDirectDownloadLink } from "@/lib/drive-utils";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function QuestionPapers() {
  const [downloading, setDownloading] = useState<string>("");

  const handleDownload = (subject: string, driveLink: string) => {
    setDownloading(subject);
    toast.promise(
      (async () => {
        try {
          const directLink = getDirectDownloadLink(driveLink);
          const filename = `${subject.toLowerCase()}-question-paper.pdf`;
          downloadFile(directLink, filename);
          // Simulate a delay to show the download process
          await new Promise((resolve) => setTimeout(resolve, 1000));
        } finally {
          setDownloading("");
        }
      })(),
      {
        loading: `Downloading ${subject} question paper...`,
        success: `${subject} question paper downloaded successfully!`,
        error: `Failed to download ${subject} question paper. Please try again.`,
      },
    );
  };
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <header className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Question Papers Archive
            </h1>
            <p className="text-lg text-muted-foreground">
              Access previous years examination papers for all classes.
            </p>
          </header>

          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="space-y-4">
              {papers.map((paper, index) => (
                <AccordionItem
                  key={index}
                  value={`${paper.class}-${paper.type}`}
                  className="rounded-lg border bg-white shadow-sm"
                >
                  <AccordionTrigger className="px-6 hover:no-underline">
                    <div className="flex flex-col items-start text-left">
                      <h2 className="text-xl font-semibold">
                        {paper.type} {paper.class}
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {paper.years.length} years paper available
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="grid gap-3">
                      {paper.years.map((subject, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between rounded-md bg-gray-50 p-3 transition-colors hover:bg-gray-100"
                        >
                          <span className="font-medium">
                            {subject.year} Paper
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleDownload(subject.year, subject.driveLink)
                            }
                            disabled={!!downloading}
                          >
                            {downloading === subject.year ? (
                              <>
                                <Loader2 className="size-5 animate-spin" />
                              </>
                            ) : (
                              <>
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </>
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
}
