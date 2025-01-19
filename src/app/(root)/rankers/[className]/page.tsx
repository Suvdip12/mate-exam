import { prisma } from "@/lib/prisma";
import { TopRankerResult } from "@/types/prisma.types";
import { unstable_cache } from "next/cache";

export default async function ClassPage({
  params,
}: {
  params: { className: string };
}) {
  const { className } = await params;
  //get data funcation
  const getCachedTopRankers = unstable_cache(
    async (className) => {
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
      revalidate: 3 * 30 * 24 * 60 * 60,
    },
  );

  const data = await getCachedTopRankers(className);
  console.log(data);

  return <div>class</div>;
}
