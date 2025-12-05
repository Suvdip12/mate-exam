import { AdminUserTable } from "@/components/admin/AdminUserTable";
import { prisma } from "@/lib/prisma";
export const metadata = {
  title: "Super Admin - Approve Users",
  description: "Approve pending user registrations as admin or super admin",
};

export default async function AdminPage() {
  const pendingUserRegistrations = await prisma.user.findMany({
    where: {
      AND: [{ role: "user" }, { emailVerified: true }],
    },
  });
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-3 py-4">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-foreground">
            Super Admin Dashboard
          </h1>
          <p className="mt-2 text-muted-foreground">
            Approve pending user registrations
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold text-foreground">
            Pending Registrations
          </h2>
          {pendingUserRegistrations.length === 0 ? (
            <p className="text-muted-foreground">No pending registrations</p>
          ) : (
            <AdminUserTable users={pendingUserRegistrations} />
          )}
        </div>
      </div>
    </main>
  );
}
