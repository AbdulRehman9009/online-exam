import { getStudentList } from "@/lib/actions/admin";
import { UserManagementTable } from "@/components/admin/UserManagementTable";
import { StudentActions } from "../../../../components/admin/StudentActions";

export default async function AdminStudentPage() {
  const students = await getStudentList();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Management</h1>
          <p className="text-muted-foreground">
            Manage registered students and their course enrollments.
          </p>
        </div>
        <StudentActions />
      </div>

      <UserManagementTable users={students} role="STUDENT" />
    </div>
  );
}
