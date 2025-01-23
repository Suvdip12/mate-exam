import Link from "next/link";
import { Button } from "@/components/ui/button";

const classes = ["V", "VI", "VII", "VIII", "IX"];

export default function Rankers() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-4">
      <h1 className="mb-8 text-4xl font-bold text-gray-800">Class Rankings</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {classes.map((classNum) => (
          <Link href={`/result/rankers/${classNum}`} key={classNum}>
            <Button className="h-24 w-full text-xl">Class {classNum}</Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
