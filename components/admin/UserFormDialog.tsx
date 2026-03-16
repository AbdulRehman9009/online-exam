"use client";

import { useTransition, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RegisterSchema } from "@/lib/schemas";
import { createUser, getDepartments, getCourses, getFaculties } from "@/lib/actions/admin";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UserFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  role: "FACULTY" | "STUDENT";
  initialData?: any; // To support editing
}

export function UserFormDialog({ isOpen, onOpenChange, role, initialData }: UserFormDialogProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const isEditing = !!initialData;

  const [departments, setDepartments] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [faculties, setFaculties] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      getDepartments().then(setDepartments);
      getCourses().then(setCourses);
      getFaculties().then(setFaculties);
    }
  }, [isOpen]);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(isEditing ? z.any() : RegisterSchema),
    defaultValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      password: "",
      role: role,
      rollNo: initialData?.student?.rollNo || "",
      teacherNo: initialData?.faculty?.teacherNo || "",
      departmentId: initialData?.faculty?.departmentId || "",
      courseId: initialData?.student?.courseId || "",
      facultyId: initialData?.student?.facultyId || "",
    },
  });

  const onSubmit = (values: any) => {
    startTransition(async () => {
      try {
        const action = isEditing 
          ? import("@/lib/actions/admin").then(m => m.updateUser({ ...values, id: initialData.id })) 
          : createUser(values);

        const data: any = await action;

        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success(data.success);
          form.reset();
          onOpenChange(false);
          router.refresh();
        }
      } catch (error) {
        toast.error("A system error occurred. Please try again.");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New {role === "FACULTY" ? "Faculty" : "Student"}</DialogTitle>
          <DialogDescription>
            Enter the details of the new {role.toLowerCase()} below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              disabled={isPending}
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              disabled={isPending}
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{isEditing ? "New Password (Leave blank to keep current)" : "Temporary Password"}</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              disabled={isPending}
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="text-xs text-destructive">{form.formState.errors.password.message}</p>
            )}
          </div>

          {role === "STUDENT" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="rollNo">Roll Number</Label>
                <Input
                  id="rollNo"
                  placeholder="STU-2024-001"
                  disabled={isPending}
                  {...form.register("rollNo")}
                />
              </div>

              <div className="space-y-2">
                <Label>Course</Label>
                <Select 
                  disabled={isPending} 
                  onValueChange={(v) => form.setValue("courseId", v)}
                  defaultValue={form.getValues("courseId")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.name} ({course.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Assigned Faculty</Label>
                <Select 
                  disabled={isPending} 
                  onValueChange={(v) => form.setValue("facultyId", v)}
                  defaultValue={form.getValues("facultyId")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Faculty Advisor" />
                  </SelectTrigger>
                  <SelectContent>
                    {faculties.map((f) => (
                      <SelectItem key={f.id} value={f.faculty?.id}>
                        {f.name} ({f.faculty?.teacherNo || "No ID"})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-[10px] text-muted-foreground italic">Connects student to specific faculty head.</p>
              </div>
            </>
          )}

          {role === "FACULTY" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="teacherNo">Teacher Identification No.</Label>
                <Input
                  id="teacherNo"
                  placeholder="FAC-2024-001"
                  disabled={isPending}
                  {...form.register("teacherNo")}
                />
              </div>

              <div className="space-y-2">
                <Label>Department</Label>
                <Select 
                  disabled={isPending} 
                  onValueChange={(v) => form.setValue("departmentId", v)}
                  defaultValue={form.getValues("departmentId")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (isEditing ? "Saving..." : "Adding...") : (isEditing ? "Save Changes" : "Add User")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
