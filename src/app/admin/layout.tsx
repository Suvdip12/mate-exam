import { auth, validateRequest } from "@/auth";
import { Button } from "@/components/ui/button";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

async function Navbar() {
  const { user } = await validateRequest();
  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-5 py-3">
        <Link
          href={"/"}
          className="hidden text-2xl font-bold text-primary md:block"
        >
          <Image
            src={"/kalyani-university-kalyani-logo.png"}
            alt="kalyani-university-kalyani-logo"
            width={40}
            height={40}
          />
        </Link>
        {user && (
          <form
            action={async () => {
              "use server";
              await auth.api.signOut({
                headers: await headers(),
              });
              redirect("/");
            }}
          >
            <Button type="submit">Sign Out</Button>
          </form>
        )}
      </div>
    </header>
  );
}
