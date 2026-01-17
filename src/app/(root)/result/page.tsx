 "use client";
// import ResultCard from "@/components/ResultCard";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {  StudentResultWithRank } from "@/types/prisma.types";
// import { SearchIcon } from "lucide-react";
// import { useState, useTransition, useEffect } from "react";
// import { toast } from "sonner";
// import axios from "axios";
// import { useSearchParams } from "next/navigation";

// export default function Result() {
//   const [searchResults, setSearchResults] = useState<StudentResultWithRank | null>(
//     null,
//   );
//   const [isPending, startTransition] = useTransition();
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     const rollParam = searchParams.get("roll");
//     if (rollParam) {
//       // Replace - with / to convert KU-26-VII-123 to KU/26/VII/123
//       const rollNumber = rollParam.replace(/-/g, "/");
//       fetchResult(rollNumber);
//     }
//   }, [searchParams]);

//   function fetchResult(rollNumber: string) {
//     if (!rollNumber) {
//       toast.error("Please enter a valid roll number.");
//       return;
//     }

//     startTransition(async () => {
//       try {
//         const { data } = await axios.post<StudentResultWithRank>("/api/student/result", {
//           rollNumber,
//         });
//         setSearchResults(data);
//         toast.success("Result found successfully!");
//       } catch (error) {
//         if (axios.isAxiosError(error)) {
//           toast.error(
//             error.response?.data?.error || "Failed to fetch result"
//           );
//         } else {
//           toast.error("An unexpected error occurred");
//         }
//         setSearchResults(null);
//       }
//     });
//   }

//   function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setSearchResults(null);
//     const form = e.currentTarget;
//     const rollNumber = (form.rollNumber as HTMLInputElement).value.trim();
    
//     if (!rollNumber) {
//       toast.error("Please enter a valid roll number.");
//       return;
//     }

//     fetchResult(rollNumber);
//   }

//   return (
//     <div className="rounded-lg bg-white p-6 shadow-lg">
//       <h1 className="font-title mb-6 text-2xl text-neutral-950">
//         Search Your Result-2025
//       </h1>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <div className="flex flex-col">
//           <label htmlFor="rollNumber" className="mb-1 text-sm text-neutral-700">
//             Roll Number
//           </label>
//           <Input
//             type="text"
//             id="rollNumber"
//             name="rollNumber"
//             defaultValue={searchParams.get("roll")?.replace(/-/g, "/") || ""}
//             placeholder="Enter your roll number eg. KU/26/VII/123"
//             className="focus:ring-primary-500 rounded-md border border-neutral-300 px-4 py-2 text-neutral-950 focus:outline-none focus:ring"
//           />
//         </div>
//         <Button
//           disabled={isPending}
//           type="submit"
//           className="rounded-md px-4 py-2"
//         >
//           {isPending ? (
//             <div className="flex items-center gap-3">
//               <div className="h-2 w-2 animate-bounce rounded-full bg-[#ffff] [animation-delay:-0.3s]"></div>
//               <div className="h-2 w-2 animate-bounce rounded-full bg-[#ffff] [animation-delay:-0.15s]"></div>
//               <div className="h-2 w-2 animate-bounce rounded-full bg-[#ffff]"></div>
//             </div>
//           ) : (
//             <>
//               <SearchIcon className="mr-2 h-5 w-5" />
//               Search
//             </>
//           )}
//         </Button>
//       </form>
//       <div className="mt-8">
//         <h2 className="text-lg font-semibold text-neutral-950">
//           Search Results
//         </h2>
//         {!searchResults ? (
//           <ul className="mt-4 space-y-2">
//             <li className="rounded-md border border-neutral-300 px-4 py-2 text-neutral-950">
//               Please verify your roll number. If you are sure it is correct, and
//               still not able to find your result, please contact us at
//               <a
//                 href="tel:+919382553880"
//                 className="ml-1 text-blue-600 hover:underline"
//               >
//                 +91-9382553880
//               </a>
//               .
//             </li>
//           </ul>
//         ) : (
//           <ResultCard student={searchResults} />
//         )}
//       </div>
//     </div>
//   );
// }

import { Clock, Calendar, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ResultNotPublished() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Result publication date and time - 12 PM (noon)
  const resultDate = new Date('2025-01-25T12:00:00');

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getTimeRemaining = () => {
    const diff = resultDate.getTime() - currentTime.getTime();
    
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, expired: false };
  };

  const timeRemaining = getTimeRemaining();

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 p-4">
      <div className="max-w-2xl w-full">
        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-neutral-950 p-8 text-white">
            <div className="flex items-center justify-center mb-4">
              <AlertCircle className="w-12 h-12" />
            </div>
            <h1 className="font-title text-3xl md:text-4xl font-bold text-center mb-2">
              Results Not Published Yet
            </h1>
            <p className="text-center text-neutral-300 text-sm md:text-base">
              Please check back at the scheduled time
            </p>
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8">
            {/* Current Time */}
            <div className="mb-8 text-center">
              <div className="inline-flex items-center gap-2 text-neutral-600 mb-2">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-medium">Current Time</span>
              </div>
              <div className="text-3xl font-bold text-neutral-950 font-mono">
                {formatTime(currentTime)}
              </div>
              <div className="text-sm text-neutral-500 mt-1">
                {formatDate(currentTime)}
              </div>
            </div>

            {/* Divider */}
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm text-neutral-500">
                  Results will be published at
                </span>
              </div>
            </div>

            {/* Result Publication Time */}
            <div className="mb-8 text-center">
              <div className="inline-flex items-center gap-2 text-neutral-600 mb-2">
                <Calendar className="w-5 h-5" />
                <span className="text-sm font-medium">Publication Time</span>
              </div>
              <div className="text-3xl font-bold text-neutral-950 font-mono">
                {formatTime(resultDate)}
              </div>
              <div className="text-sm text-neutral-500 mt-1">
                {formatDate(resultDate)}
              </div>
            </div>

            {/* Countdown Timer */}
            {!timeRemaining.expired ? (
              <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                <h3 className="text-center text-neutral-700 font-semibold mb-4">
                  Time Remaining
                </h3>
                <div className="grid grid-cols-4 gap-3 md:gap-4">
                  <div className="text-center">
                    <div className="bg-white rounded-md p-3 md:p-4 shadow border border-neutral-200">
                      <div className="text-2xl md:text-3xl font-bold text-neutral-950">
                        {timeRemaining.days}
                      </div>
                      <div className="text-xs text-neutral-500 mt-1 uppercase">
                        Days
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white rounded-md p-3 md:p-4 shadow border border-neutral-200">
                      <div className="text-2xl md:text-3xl font-bold text-neutral-950">
                        {timeRemaining.hours}
                      </div>
                      <div className="text-xs text-neutral-500 mt-1 uppercase">
                        Hours
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white rounded-md p-3 md:p-4 shadow border border-neutral-200">
                      <div className="text-2xl md:text-3xl font-bold text-neutral-950">
                        {timeRemaining.minutes}
                      </div>
                      <div className="text-xs text-neutral-500 mt-1 uppercase">
                        Minutes
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white rounded-md p-3 md:p-4 shadow border border-neutral-200">
                      <div className="text-2xl md:text-3xl font-bold text-neutral-950">
                        {timeRemaining.seconds}
                      </div>
                      <div className="text-xs text-neutral-500 mt-1 uppercase">
                        Seconds
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-300 rounded-lg p-6 text-center">
                <p className="text-green-700 font-semibold text-lg">
                  🎉 Results should be available now! Please refresh the page.
                </p>
              </div>
            )}

            {/* Info Message */}
            <div className="mt-8 bg-neutral-50 border-l-4 border-neutral-950 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-neutral-950" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-neutral-700">
                    <span className="font-medium">Note:</span> Results will be available exactly at the scheduled time. Please bookmark this page and check back later.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-6 text-center text-sm text-neutral-600">
              <p>For any queries, contact us at:</p>
              <a 
                href="tel:+919382553880" 
                className="text-neutral-950 hover:underline font-medium"
              >
                +91-9382553880
              </a>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-4 text-center text-sm text-neutral-500">
          <p>This page will automatically update every second</p>
        </div>
      </div>
    </div>
  );
}
