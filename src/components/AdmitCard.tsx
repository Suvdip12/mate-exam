/* eslint-disable @next/next/no-img-element */
"use client";
import * as React from "react";
import { QRCodeSVG } from "qrcode.react";

interface AdmitCardProps {
  data: {
    rollNo: string;
    appNo: string;
    name: string;
    gender: string;
    fatherName: string;
    address: string;
    examDate: string;
    examTime: string;
    venue: string;
    reportingTime: string;
    lastEntryTime: string;
  };
}

export const AdmitCard = React.forwardRef<HTMLDivElement, AdmitCardProps>(
  ({ data }, ref) => {
    return (
      <div
        ref={ref}
        className="mx-auto h-[297mm] w-[210mm] overflow-hidden border border-gray-200 bg-white p-10 font-sans text-black print:m-0 print:border-0 print:p-8"
      >
        {/* Header */}
        <div className="mb-6 flex items-start justify-between border-b border-black pb-4">
          <div className="h-24 w-24">
            <img
              src="/images/image.png"
              alt="WBPRB Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex-1 px-4 text-center">
            <h1 className="text-xl font-bold uppercase">
              West Bengal Police Recruitment Board
            </h1>
            <p className="text-xs">
              ARAKSHA BHAVAN (5TH FLOOR), 6TH CROSS ROAD,
            </p>
            <p className="text-xs">
              BLOCK-DJ, SECTOR-II, SALT LAKE CITY, KOLKATA-700 091
            </p>
            <h2 className="mt-2 border-y border-black py-1 text-lg font-bold uppercase">
              Admit Card
            </h2>
            <p className="mt-1 text-xs font-bold uppercase">
              For Written Examination for the post of Constables in West Bengal
              Police - 2024
            </p>
          </div>
          <div className="flex h-24 w-24 flex-col items-end">
            <img
              src="/images/image.png"
              alt="Govt Logo"
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        {/* Candidate Details Section */}
        <div className="mb-6 flex gap-8">
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
            <div className="grid grid-cols-[180px_1fr]">
              <span className="font-bold">Gender</span>
              <span>: {data.gender}</span>
            </div>
            <div className="grid grid-cols-[180px_1fr]">
              <span className="font-bold">
                {"Father's/Mother's/ Husband's Name"}
              </span>
              <span>: {data.fatherName}</span>
            </div>
            <div className="grid grid-cols-[180px_1fr] items-start">
              <span className="font-bold">Address</span>
              <span className="text-xs leading-tight">: {data.address}</span>
            </div>
          </div>

          <div className="flex w-[120px] flex-col items-center justify-start pt-2">
            <div className="border border-black bg-white p-1">
              <QRCodeSVG
                value={`ROLL:${data.rollNo}|APP:${data.appNo}`}
                size={100}
              />
            </div>
            <p className="mt-2 text-center text-[10px]">
              Scan for verification
            </p>
          </div>
        </div>

        {/* Exam Schedule Section */}
        <div className="mb-4 grid grid-cols-2 border border-black text-sm">
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
              <p className="text-xs leading-tight">{data.venue}</p>
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

        {/* Instructions Section */}
        <div className="border border-black">
          <div className="border-b border-black bg-gray-100 py-1 text-center text-sm font-bold uppercase">
            Important Instructions
          </div>
          <div className="list-decimal space-y-2 p-4 text-[10px] leading-relaxed">
            {[
              "NO CANDIDATE SHALL BE ALLOWED INTO EXAM VENUE/HALL WITHOUT A COPY OF THE DOWNLOADED ADMIT CARD WITH THE QR CODE.",
              "CANDIDATES MUST BRING HIS/HER ORIGINAL AADHAAR CARD BEARING THE AADHAAR NUMBER WHICH WAS SUBMITTED BY HIM/HER DURING DOWNLOADING OF ADMIT CARD AS A PROOF OF HIS/HER IDENTITY...",
              "PHOTOGRAPH OF THE CANDIDATES WILL BE CAPTURED ALONG WITH HIS/HER DIGITAL ATTENDANCE AT THE VENUE. EACH OF THE CANDIDATES OF A PARTICULAR VENUE MUST ENSURE THAT HIS/HER PHOTOGRAPH IS CAPTURED...",
              "NO CANDIDATE WILL BE ALLOWED ENTRY INTO THE PREMISES OF VENUE AS WELL AS THE HALL AFTER 10:30 AM.",
              "CANDIDATES WHO HAD ENTERED HIS/HER GENDER INCORRECTLY WILL NOT BE ALLOWED ENTRY INTO THE VENUE.",
              "NO CANDIDATE WILL BE ALLOWED TO LEAVE THE EXAMINATION HALL BEFORE THE SCHEDULED TIME OF CONCLUSION OF THE EXAMINATION AND COLLECTION OF ALL THE OMR SHEETS BY THE INVIGILATOR(S).",
              "THE CANDIDATES ARE ADVISED NOT TO BRING ANY MOBILE PHONE, DIGITAL WRIST WATCHES INCLUDING SMART WATCHES, CALCULATORS, ELECTRONIC GADGETS, BOOKS, PENS, NOTES ETC. TO THE EXAM VENUE.",
              "ANY KIND OF CANVASSING, MALPRACTICE ADOPTED WILL LEAD TO CANCELLATION OF THE CANDIDATURE AT ANY STAGE OF THE EXAM, WITHOUT RECOURSE TO ANY REPRESENTATION.",
              "FOLLOW THE INSTRUCTIONS PROPERLY GIVEN ON THE FRONT AND REVERSE PAGE OF OMR ANSWER SHEET. INCORRECT ENCODING OF REQUIRED DETAILS WILL LEAD TO CANCELLATION OF THE OMR ANSWER SHEET.",
              "ONLY BLACK BALL POINT PEN ISSUED BY WBPRB MUST BE USED TO FILL PERSONAL PARTICULARS. ENCODE THE REQUIRED DETAILS AND MARK ANSWERS ON OMR SHEET.",
              "CANDIDATES MUST NOT TAKE AWAY OR SEPARATE THE PAGES OF OMR SHEET (PROPERTY OF WBPRB) OR DAMAGE IT IN ANY WAY.",
              "NO REQUEST FOR CHANGE OF EXAM VENUE, SEATING ARRANGEMENT AS WELL AS DATE OF EXAMINATION WILL BE ENTERTAINED.",
              "THE RESULT IS SUBJECT TO VARIATION, DEPENDING UPON THE FINAL OUTCOME OF THE COURT PROCEEDINGS.",
              "THE CANDIDATES ARE ADVISED TO VISIT THE WEBSITES OF WEST BENGAL POLICE RECRUITMENT BOARD (https://prb.wb.gov.in) AND WEST BENGAL POLICE (www.wbpolice.gov.in) TO HAVE UPDATED WITH THE STATUS OF THE RECRUITMENT DRIVE.",
            ].map((rule, i) => (
              <div key={i} className="flex gap-2">
                <span className="min-w-[15px] font-bold">{i + 1}.</span>
                <p>{rule}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-8">
          <div className="flex w-full justify-end">
            <div className="min-w-[250px] text-center">
              <div className="mb-2 flex h-12 items-end justify-center border-b border-dashed border-gray-400">
                <span className="text-[10px] italic text-gray-400">
                  Signature of Issuing Authority
                </span>
              </div>
              <p className="text-[11px] font-bold">Member Secretary</p>
              <p className="text-[11px] font-bold uppercase leading-tight">
                West Bengal Police Recruitment Board
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

AdmitCard.displayName = "AdmitCard";
