/* eslint-disable @next/next/no-img-element */
"use client";
import * as React from "react";
import { QRCodeSVG } from "qrcode.react";
import { AdmitCardData } from "@/types/types";

interface AdmitCardProps {
  data: AdmitCardData;
}

const examRules = [
  {
    en: "NO CANDIDATE SHALL BE ALLOWED INTO THE EXAMINATION HALL WITHOUT A COPY OF THE DOWNLOADED ADMIT CARD WITH QR CODE.",
    bn: "কোনো প্রার্থী কিউআর কোডসহ ডাউনলোড করা প্রবেশপত্র ছাড়া পরীক্ষাকক্ষে প্রবেশ করতে পারবে না।",
  },
  {
    en: "CANDIDATES MUST CARRY A VALID ORIGINAL PHOTO IDENTITY PROOF.",
    bn: "প্রার্থীদের অবশ্যই একটি বৈধ মূল ফটো পরিচয়পত্র সঙ্গে আনতে হবে।",
  },
  {
    en: "CANDIDATES MUST WRITE THEIR NAME AND ROLL NUMBER STRICTLY AS PER THE ADMIT CARD.",
    bn: "প্রার্থীদের অবশ্যই প্রবেশপত্র অনুযায়ী তাদের নাম ও রোল নম্বর লিখতে হবে।",
  },
  {
    en: "CANDIDATES MUST REPORT AT THE EXAMINATION VENUE WITHIN THE REPORTING TIME.",
    bn: "প্রার্থীদের নির্ধারিত রিপোর্টিং সময়ের মধ্যে পরীক্ষাকেন্দ্রে উপস্থিত হতে হবে।",
  },
  {
    en: "NO CANDIDATE SHALL BE PERMITTED TO ENTER THE VENUE AFTER THE LAST ENTRY TIME.",
    bn: "শেষ প্রবেশ সময়ের পরে কোনো প্রার্থীকে কেন্দ্রে প্রবেশ করতে দেওয়া হবে না।",
  },
  {
    en: "THE QUESTION PAPER CONTAINS 25 QUESTIONS IN EACH VERSION.",
    bn: "প্রতিটি সংস্করণের প্রশ্নপত্রে মোট ২৫টি প্রশ্ন থাকবে।",
  },
  {
    en: "EACH QUESTION CARRIES 4 MARKS AND THERE WILL BE A NEGATIVE MARKING OF 25 PERCENT FOR EACH WRONG ANSWER.",
    bn: "প্রতিটি প্রশ্নের জন্য ৪ নম্বর থাকবে এবং প্রতিটি ভুল উত্তরের জন্য ২৫ শতাংশ নেগেটিভ মার্কিং হবে।",
  },
  {
    en: "USE OF MOBILE PHONES OR ANY ELECTRONIC DEVICES IS STRICTLY PROHIBITED INSIDE THE EXAMINATION HALL.",
    bn: "পরীক্ষাকক্ষে মোবাইল ফোন বা যেকোনো ইলেকট্রনিক ডিভাইস ব্যবহার সম্পূর্ণ নিষিদ্ধ।",
  },
  {
    en: "ROUGH SHEETS WILL BE PROVIDED FOR ROUGH WORK AND MUST BE SUBMITTED ALONG WITH THE ANSWER BOOK.",
    bn: "রাফ কাজের জন্য রাফ শিট প্রদান করা হবে এবং উত্তরপত্রের সঙ্গে তা জমা দিতে হবে।",
  },
  {
    en: "CANDIDATES MUST FOLLOW ALL INSTRUCTIONS GIVEN BY THE INVIGILATORS DURING THE EXAMINATION.",
    bn: "পরীক্ষার সময় পরীক্ষাকক্ষের পর্যবেক্ষকদের দেওয়া সমস্ত নির্দেশ অবশ্যই মানতে হবে।",
  },
];

export const AdmitCard = React.forwardRef<HTMLDivElement, AdmitCardProps>(
  ({ data }, ref) => {
    return (
      <div
        ref={ref}
        className="mx-auto w-[210mm] border border-gray-200 bg-white p-10 font-sans text-black print:m-0 print:h-auto print:w-[210mm] print:break-inside-avoid print:border-0 print:p-8"
      >
        {/* Header */}
        <div className="mb-6 flex items-start justify-between border-b border-black pb-4">
          <div className="h-24 w-24">
            <img
              src="/kalyani-university-bg-remove.png"
              alt="University Logo"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="flex-1 px-4 text-center">
            <h1 className="text-xl font-bold uppercase">
              24th MATHEMATICS APTITUDE TEST-2026
            </h1>
            <p className="text-xs uppercase">
              ORGANIZED BY: DWIJENDRALAL BHAWAN (P.G. HALL-1)
            </p>
            <p className="text-xs uppercase">
              BLOCK C, KALYANI, WEST BENGAL – 741235
            </p>
            <p className="mt-1 border-y border-black py-1 text-xs font-bold uppercase">
              UNIVERSITY OF KALYANI
            </p>
            <h2 className="mt-2 text-lg font-bold uppercase">ADMIT CARD</h2>
          </div>

          <div className="h-24 w-24">
            <img
              src="/pg1-gold.png"
              alt="PG1 Logo"
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        {/* Candidate Details */}
        <div className="mb-4 flex gap-8">
          <div className="flex-1 space-y-2 text-[13px]">
            <div className="grid grid-cols-[180px_1fr]">
              <span className="font-bold">Written Exam Roll No.</span>
              <span>: {data.rollNo}</span>
            </div>

            <div className="grid grid-cols-[180px_1fr]">
              <span className="font-bold">Application Serial No.</span>
              <span>: {data.appNo}</span>
            </div>

            <div className="grid grid-cols-[180px_1fr]">
              <span className="font-bold">Name of the Candidate</span>
              <span>: {data.name}</span>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-start">
              <span className="font-bold">School</span>
              <span className="text-xs leading-tight">: {data.school}</span>
            </div>
          </div>

          <div className="flex w-[120px] flex-col items-center justify-start pt-2">
            <div className="border border-black bg-white p-1">
              <QRCodeSVG
                value={`${process.env.BETTER_AUTH_URL}/result?roll=${data.rollNo.replace(/-/g, "/")}`}
                size={100}
              />
            </div>
            <p className="mt-2 text-center text-[10px]">Scan for result</p>
          </div>
        </div>

        {/* Exam Schedule */}
        <div className="mb-2 grid grid-cols-2 border border-black text-sm">
          <div className="space-y-1 border-r border-black p-2">
            <p>
              <span className="font-bold">Date of Written Examination :</span>{" "}
              {data.examDate}
            </p>
            <p>
              <span className="font-bold">Time of Written Examination :</span>{" "}
              {data.examTime}
            </p>
            <div className="pt-2">
              <p className="font-bold underline">Venue:</p>
              <p className="text-xs uppercase leading-tight">{data.venue}</p>
            </div>
          </div>

          <div className="space-y-1 bg-gray-50 p-2">
            <p className="text-xs">
              <span className="font-bold">
                Reporting time at the Written Examination Venue :
              </span>
            </p>
            <p className="font-bold">{data.reportingTime}</p>

            <div className="pt-4">
              <p className="text-xs">
                <span className="font-bold">
                  Time of Last Entry inside the Written Examination Venue :
                </span>
              </p>
              <p className="font-bold">{data.lastEntryTime}</p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="border border-black">
          <div className="border-b border-black bg-gray-100 py-1 text-center text-sm font-bold uppercase">
            IMPORTANT INSTRUCTIONS / গুরুত্বপূর্ণ নির্দেশাবলী
          </div>

          <div className="list-decimal space-y-2 p-4 text-[10px] leading-relaxed">
            {examRules.map((rule, i) => (
              <div key={i} className="flex gap-2">
                <span className="min-w-[14px] font-bold">{i + 1}.</span>
                <div>
                  <p>{rule.en}</p>
                  <p className="italic">{rule.bn}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8">
          <div className="flex w-full justify-end">
            <div className="min-w-[250px] text-center">
              <div className="mb-2 flex h-12 items-end justify-center border-b border-dashed border-gray-400">
                {/* Signature Image */}
                <img
                  src="/mat-convenor-2026-signature.png"
                  alt="Signature"
                  className="max-h-10 object-contain"
                />
              </div>
              <p className="text-[11px] font-bold">CONVENOR OF EXAMINATION</p>
              <p className="text-[11px] font-bold uppercase leading-tight">
                MATHEMATICS APTITUDE TEST-2026
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

AdmitCard.displayName = "AdmitCard";
