import { prisma } from "@/lib/prisma";
import { TopRankerResult } from "@/types/prisma.types";
import { ArrowLeft } from "lucide-react";
import { unstable_cache } from "next/cache";
import Link from "next/link";

export default async function TopRankerResultPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  //get data funcation
  const { slug: className } = await params;
  const getCachedTopRankers = unstable_cache(
    async (className: string) => {
      const rankers = await prisma.$queryRaw<TopRankerResult[]>`
      WITH RankedResults AS (
    SELECT 
        r.name,
        r.roll_number,
        r.class,
        r.total_score,
        DENSE_RANK() OVER (ORDER BY r.total_score DESC) as rank,
        s.school_name,
        s.school_code, -- Added school_code
        c.center_name,
        c.center_code  -- Added center_code
    FROM 
        results r
    JOIN 
        schools s ON r."schoolId" = s.id
    JOIN 
        centers c ON r."centerId" = c.id
    WHERE
    r.class=${className}
)
SELECT *
FROM RankedResults
WHERE rank <= 10
ORDER BY total_score DESC,name;`;
      const data = rankers.map((result) => ({
        ...result,
        rank: result.rank.toString(), // Convert BigInt safely
      }));

      return data;
    },
    [className],
    {
      tags: ["getTopRankers"],
      revalidate: 3 * 60 * 60,
    },
  );

  const data = await getCachedTopRankers(className);
  // console.log(data);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-800 md:text-4xl">
        Top Rankers - Class {className}
      </h1>
      <div className="w-full max-w-full overflow-hidden rounded-lg bg-white shadow-lg md:max-w-4xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <caption className="sr-only">
              Top 3 students in Class {className}
            </caption>
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-4 py-2 text-left">Rank</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="hidden py-2 text-left md:table-cell">Class</th>
                <th className="hidden px-4 py-2 text-left sm:table-cell">
                  Center
                </th>

                <th className="py-2 text-center">Roll Number</th>
                <th className="px-4 py-2 text-right">Score</th>
              </tr>
            </thead>
            <tbody>
              {data.map((ranker, index) => (
                <tr
                  key={ranker.id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td key={ranker.id} className="px-4 py-2 font-medium">
                    {ranker.rank}{" "}
                    {Number(ranker.rank) > 3
                      ? "th"
                      : ranker.rank === "1"
                        ? "st"
                        : ranker.rank === "2"
                          ? "nd"
                          : "rd"}
                  </td>
                  <td key={ranker.id} className="px-4 py-2">
                    {ranker.name.toUpperCase()}
                  </td>
                  <td
                    key={ranker.id}
                    className="hidden px-4 py-2 md:table-cell"
                  >
                    {ranker.class}
                  </td>
                  <td
                    key={ranker.id}
                    className="hidden px-4 py-2 sm:table-cell"
                  >
                    {ranker.center_name}
                  </td>
                  <td key={ranker.id} className="px-4 py-2 text-right">
                    {ranker.roll_number.toUpperCase()}
                  </td>
                  <td key={ranker.id} className="px-4 py-2 text-right">
                    {ranker.total_score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Link
        href="/result/rankers"
        className="mt-8 flex items-center justify-center gap-2 rounded-md bg-blue-500 px-6 py-2 text-white transition-colors duration-300 hover:bg-blue-600"
      >
        <ArrowLeft className="size-5" />
        Back to Class List
      </Link>
    </div>
  );
}
