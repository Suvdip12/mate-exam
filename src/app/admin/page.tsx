import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle, Settings, FileUserIcon, UserSearch } from "lucide-react";
import { cn } from "@/lib/utils";
import { validateRequest } from "@/auth";
export default async function Page() {
  const { user, session } = await validateRequest();
  return (
    <div className="min-h-screen p-4">
      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">
              Admin Dashboard
            </CardTitle>
          </div>
          <CardDescription>
            Manage result application data and settings
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Button
            className="h-24 w-full justify-start px-4 text-lg"
            variant="ghost"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Add New Result
          </Button>
          <Link
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-24 w-full justify-start px-4 text-lg",
            )}
            href="/admin/student-registration"
          >
            <FileUserIcon className="mr-2 h-5 w-5" />
            Student Registration
          </Link>
          <Link
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-24 w-full justify-start px-4 text-lg",
            )}
            href="/admin/student"
          >
            <UserSearch className="mr-2 size-5" />
            Find Student
          </Link>
          {user && session.user.role === "super-admin" ? (
            <Link
              className={cn(
                buttonVariants({ variant: "default" }),
                "h-24 w-full justify-start px-4 text-lg",
              )}
              href="/admin/settings/pending-users"
            >
              <Settings className="mr-2 h-5 w-5" />
              Settings
            </Link>
          ) : (
            <Button
              className="h-24 w-full justify-start px-4 text-lg"
              variant="ghost"
            >
              <Settings className="mr-2 h-5 w-5" />
              Settings
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
