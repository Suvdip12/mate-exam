import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle, List, Download, Settings } from "lucide-react";
export default function page() {
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
          <Link href="/admin/add-result" className="block">
            <Button
              className="h-24 w-full justify-start px-4 text-lg"
              variant="default"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Add New Result
            </Button>
          </Link>
          <Button
            className="h-24 w-full justify-start px-4 text-lg"
            variant="secondary"
          >
            <List className="mr-2 h-5 w-5" />
            View All Results
          </Button>
          <Button
            className="h-24 w-full justify-start px-4 text-lg"
            variant="outline"
          >
            <Download className="mr-2 h-5 w-5" />
            Export Data
          </Button>
          <Button
            className="h-24 w-full justify-start px-4 text-lg"
            variant="ghost"
          >
            <Settings className="mr-2 h-5 w-5" />
            Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
