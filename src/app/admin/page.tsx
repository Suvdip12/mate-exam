import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PlusCircle,
  Settings,
  FileUserIcon,
  UserSearch,
  Users,
  FileText,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";

async function getDashboardStats() {
  try {
    const [totalStudents, totalResults, todayResults] = await Promise.all([
      // Total students count
      prisma.student.count(),

      // Total results count
      prisma.result.count(),

      // Today's results count
      prisma.result.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
      }),
    ]);

    return {
      totalStudents,
      totalResults,
      todayResults,
    };
  } catch (error) {
    return {
      totalStudents: 0,
      totalResults: 0,
      todayResults: 0,
    };
  }
}

export default async function Page() {
  const { user, session } = await validateRequest();
  const stats = await getDashboardStats();

  const statsCards = [
    {
      title: "Total Students",
      value: stats.totalStudents,
      icon: Users,
      description: "Registered students",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Results",
      value: stats.totalResults,
      icon: FileText,
      description: "Results added",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Today's Results",
      value: stats.todayResults,
      icon: TrendingUp,
      description: "Added today",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="min-h-screen w-full p-2 sm:p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-4 sm:space-y-6">
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-xl font-bold sm:text-2xl">
                  Admin Dashboard
                </CardTitle>
                <CardDescription className="mt-1 text-sm sm:text-base">
                  Manage result application data and settings
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {statsCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="overflow-hidden">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground sm:text-sm">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold sm:text-3xl">
                        {stat.value.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {stat.description}
                      </p>
                    </div>
                    <div
                      className={cn("rounded-full p-2 sm:p-3", stat.bgColor)}
                    >
                      <Icon
                        className={cn("h-5 w-5 sm:h-6 sm:w-6", stat.color)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">Quick Actions</CardTitle>
            <CardDescription className="text-sm">
              Common tasks and operations
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:gap-4 sm:p-6 lg:grid-cols-2">
            <Link
              className={cn(
                buttonVariants({ variant: "default" }),
                "h-20 w-full justify-start px-4 text-base sm:h-24 sm:text-lg",
              )}
              href="/admin/add-result"
            >
              <PlusCircle className="mr-2 h-5 w-5 shrink-0" />
              <span className="truncate">Add New Result</span>
            </Link>
            <Link
              className={cn(
                buttonVariants({ variant: "default" }),
                "h-20 w-full justify-start px-4 text-base sm:h-24 sm:text-lg",
              )}
              href="/admin/student-registration"
            >
              <FileUserIcon className="mr-2 h-5 w-5 shrink-0" />
              <span className="truncate">Student Registration</span>
            </Link>
            <Link
              className={cn(
                buttonVariants({ variant: "default" }),
                "h-20 w-full justify-start px-4 text-base sm:h-24 sm:text-lg",
              )}
              href="/admin/student"
            >
              <UserSearch className="mr-2 h-5 w-5 shrink-0" />
              <span className="truncate">Find Student</span>
            </Link>
            {user && session.user.role === "super-admin" ? (
              <Link
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "h-20 w-full justify-start px-4 text-base sm:h-24 sm:text-lg",
                )}
                href="/admin/settings/pending-users"
              >
                <Settings className="mr-2 h-5 w-5 shrink-0" />
                <span className="truncate">Settings</span>
              </Link>
            ) : (
              <div
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-20 w-full cursor-not-allowed justify-start px-4 text-base opacity-50 sm:h-24 sm:text-lg",
                )}
              >
                <Settings className="mr-2 h-5 w-5 shrink-0" />
                <span className="truncate">Settings</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
