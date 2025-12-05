import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { auth, validateRequest } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
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
        <div className="mr-7 p-1 md:mr-5 lg:mr-2">
          {user ? (
            session.user.role === "user" ? (
              <form
                action={async () => {
                  "use server";
                  await auth.api.signOut({
                    headers: await headers(),
                  });
                  redirect("/login");
                }}
              >
                <Button type="submit">Sign Out</Button>
              </form>
            ) : (
              user &&
              (session.user.role === "admin" ||
                session.user.role === "super-admin") && (
                <Button>
                  <Link href="/admin">Dashboard</Link>
                </Button>
              )
            )
          ) : (
            <Link
              className={cn(buttonVariants({ variant: "outline" }))}
              href="/login"
            >
              Admin Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
