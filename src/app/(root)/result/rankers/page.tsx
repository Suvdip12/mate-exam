import Link from "next/link";
import { Button } from "@/components/ui/button";

const classes = ["V", "VI", "VII", "VIII", "IX"];

export default function Rankers() {
  return (
    <div className="flex min-h-screen flex-col items-center p-4">
      <h1 className="mb-8 text-4xl font-bold">
        Select Your Class To View Rankers
      </h1>
      <div className="grid w-full grid-cols-1 gap-4">
        {classes.map((classNum) => (
          <Link href={`/result/rankers/${classNum}`} key={classNum}>
            <Button className="h-20 w-full text-xl">Class {classNum}</Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
