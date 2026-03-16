import { getFacultyList } from "@/lib/actions/admin";
import { UserManagementTable } from "@/components/admin/UserManagementTable";
import { FacultyActions } from "../../../../components/admin/FacultyActions";

export default async function AdminFacultyPage() {
  const faculty = await getFacultyList();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Faculty Management</h1>
          <p className="text-muted-foreground">
            Manage your teaching staff and their department assignments.
          </p>
        </div>
        <FacultyActions />
      </div>

      <UserManagementTable users={faculty} role="FACULTY" />
    </div>
  );
}
