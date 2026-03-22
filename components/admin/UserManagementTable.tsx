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
import { motion, AnimatePresence } from "motion/react";
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
    <div className="rounded-xl border bg-card/50 backdrop-blur-sm overflow-hidden shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border/50">
            <TableHead className="font-bold py-4">Name</TableHead>
            <TableHead className="font-bold py-4">Email</TableHead>
            {role === "STUDENT" && <TableHead className="font-bold py-4">Roll No</TableHead>}
            <TableHead className="font-bold py-4">Department</TableHead>
            <TableHead className="font-bold py-4">Joined</TableHead>
            <TableHead className="text-right font-bold py-4">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence mode="popLayout">
            {users.length === 0 ? (
              <motion.tr 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <TableCell colSpan={role === "STUDENT" ? 6 : 5} className="text-center h-24 text-muted-foreground italic">
                  No {role.toLowerCase()} found.
                </TableCell>
              </motion.tr>
            ) : (
              users.map((user, index) => (
                <motion.tr 
                  key={user.id} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="group hover:bg-primary/5 transition-colors border-border/40"
                >
                  <TableCell className="font-bold py-4">{user.name}</TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  {role === "STUDENT" && <TableCell className="font-black text-primary">{user.student?.rollNo || "N/A"}</TableCell>}
                  <TableCell>
                    <span className="px-2 py-1 rounded-md bg-secondary/50 text-[10px] font-bold uppercase tracking-wider">
                      {role === "FACULTY" 
                        ? user.faculty?.department?.name || "N/A"
                        : user.student?.course?.department?.name || "N/A"}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs font-medium text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-xl shadow-xl">
                        <DropdownMenuItem 
                          className="cursor-pointer font-medium"
                          onClick={() => handleEdit(user)}
                        >
                          <Edit className="mr-2 h-4 w-4" /> Edit Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="cursor-pointer text-destructive focus:text-destructive font-medium"
                          onClick={() => handleDelete(user.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Remove User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </motion.tr>
              ))
            )}
          </AnimatePresence>
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
