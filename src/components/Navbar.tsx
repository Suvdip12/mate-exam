import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { validateRequest } from "@/auth";
export default async function Navbar() {
  const { user, session } = await validateRequest();
  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 p-4">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src={"/kalyani-university-kalyani-logo.png"}
            alt="kalyani-university-kalyani-logo"
            width={40}
            height={40}
          />
          <span className="text-xl font-bold">University of Kalyani</span>
        </Link>
        {user && session.user.role === "admin" ? (
          <Button>
            <Link href="/admin">Dashboard</Link>
          </Button>
        ) : (
          ""
        )}
      </div>
    </header>
  );
}
