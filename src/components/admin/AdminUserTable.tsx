"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { approveUser, rejectUser } from "@/lib/actions/admin.action";
import { User } from "@prisma/client";
import { toast } from "sonner";

interface AdminUserTableProps {
  users: User[];
}

export function AdminUserTable({ users: initialUsers }: AdminUserTableProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [loading, setLoading] = useState<string | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<Record<string, string>>(
    {},
  );

  const handleRoleChange = (userId: string, role: string) => {
    setSelectedRoles((prev) => ({
      ...prev,
      [userId]: role,
    }));
  };

  const handleSave = async (userId: string) => {
    const role = selectedRoles[userId];
    if (!role) {
      alert("Please select a role");
      return;
    }

    setLoading(userId);
    try {
      await approveUser(userId, role);
      setUsers(users.filter((u) => u.id !== userId));
      setSelectedRoles((prev) => {
        const newRoles = { ...prev };
        delete newRoles[userId];
        return newRoles;
      });
      toast.success("User approved successfully");
    } catch (error) {
      toast.error("Error approving user");
    } finally {
      setLoading(null);
    }
  };

  const handleReject = async (userId: string) => {
    setLoading(userId);
    try {
      await rejectUser(userId);
      setUsers(users.filter((u) => u.id !== userId));
      setSelectedRoles((prev) => {
        const newRoles = { ...prev };
        delete newRoles[userId];
        return newRoles;
      });
      toast.success("User rejected successfully");
    } catch (error) {
      toast.error("Error rejecting user");
    } finally {
      setLoading(null);
    }
  };

  if (users.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">No pending registrations</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Select
                  value={selectedRoles[user.id] || "user"}
                  onValueChange={(role) => handleRoleChange(user.id, role)}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="super-admin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="default"
                    onClick={() => handleSave(user.id)}
                    disabled={loading === user.id || !selectedRoles[user.id]}
                  >
                    {loading === user.id ? "..." : "Save"}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleReject(user.id)}
                    disabled={loading === user.id}
                  >
                    {loading === user.id ? "..." : "Reject"}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
