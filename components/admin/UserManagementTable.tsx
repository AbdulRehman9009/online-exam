"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, MoreHorizontal, UserPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteUser } from "@/lib/actions/admin";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";
import { UserFormDialog } from "./UserFormDialog";

interface UserManagementTableProps {
  users: any[];
  role: "FACULTY" | "STUDENT";
}

export function UserManagementTable({ users, role }: UserManagementTableProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      startTransition(() => {
        deleteUser(id).then((result) => {
          if (result.success) {
            toast.success(result.success);
            router.refresh();
          } else {
            toast.error("Failed to delete user");
          }
        });
      });
    }
  };

  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            {role === "STUDENT" && <TableHead>Roll No</TableHead>}
            {role === "FACULTY" && <TableHead>Teacher ID</TableHead>}
            <TableHead>Department</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                No {role.toLowerCase()} found.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                {role === "STUDENT" && <TableCell className="font-bold text-primary">{user.student?.rollNo || "N/A"}</TableCell>}
                {role === "FACULTY" && <TableCell className="font-bold text-primary">{user.faculty?.teacherNo || "N/A"}</TableCell>}
                <TableCell>
                  {role === "FACULTY" 
                    ? user.faculty?.department?.name || "N/A"
                    : user.student?.course?.department?.name || "N/A"}
                </TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        className="cursor-pointer"
                        onClick={() => handleEdit(user)}
                      >
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="cursor-pointer text-destructive focus:text-destructive"
                        onClick={() => handleDelete(user.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {isEditOpen && selectedUser && (
        <UserFormDialog 
          isOpen={isEditOpen} 
          onOpenChange={setIsEditOpen} 
          role={role} 
          initialData={selectedUser} 
        />
      )}
    </div>
  );
}
