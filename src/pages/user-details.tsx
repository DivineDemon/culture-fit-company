import { Loader2, Upload, UserPen, UserPlus } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EmployeeFile from "@/components/dashboard/employee-file";
import EmployeeSheet from "@/components/dashboard/employee-sheet";
import { ChartBarDefault } from "@/components/shared/chart-bar";
import UploadModal from "@/components/shared/file-uploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useGetEmployeebyIdQuery } from "@/store/services/employees";
import type { RootState } from "@/types/global";

const UserDetails = () => {
  const [open, setOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [uploadOpen, setUploadOpen] = useState(false);
  const companyId = useSelector((state: RootState) => state.global.id);
  const { data: employee, isLoading } = useGetEmployeebyIdQuery({
    companyId,
    id: id!,
  });

  const handleUpload = (files: File[]) => {
    if (!files.length) return;
    setUploadOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-auto">
      <div className="flex items-center justify-between">
        <Label className="font-bold text-primary text-xl sm:text-2xl md:text-3xl">{employee?.name || "N/A"}</Label>
        <div className="hidden flex-col gap-2.5 md:flex md:flex-row">
          <Button variant="default" size="sm" type="button" onClick={() => setOpen(true)}>
            Edit Details <UserPen className="ml-1 size-4" />
          </Button>
          <Button variant="default" size="sm" type="button" onClick={() => setUploadOpen(true)}>
            Upload Resume <Upload className="ml-1 size-4" />
          </Button>
        </div>
        <div className="flex gap-2.5 md:hidden">
          <Button variant="default" size="sm" type="button" onClick={() => setOpen(true)}>
            <UserPlus className="ml-1 size-4" />
          </Button>
          <Button variant="default" size="sm" type="button" onClick={() => setUploadOpen(true)}>
            <Upload className="ml-1 size-4" />
          </Button>
        </div>
      </div>

      <Card className="w-full rounded-xl shadow-none">
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col rounded-lg border p-4 shadow">
            <p className="font-semibold text-base sm:text-lg">Email</p>
            <p className="text-muted-foreground text-sm">{employee?.email || "N/A"}</p>
          </div>

          <div className="flex flex-col rounded-lg border p-4 shadow">
            <p className="font-semibold text-base sm:text-lg">Designation</p>
            <p className="text-muted-foreground text-sm">{employee?.user_designation || "N/A"}</p>
          </div>

          <div className="flex flex-col rounded-lg border p-4 shadow">
            <p className="font-semibold text-base sm:text-lg">Department</p>
            <p className="text-muted-foreground text-sm">{employee?.department || "N/A"}</p>
          </div>

          <div className="flex flex-col rounded-lg border p-4 shadow">
            <p className="font-semibold text-base sm:text-lg">Salary</p>
            <p className="text-muted-foreground text-sm">{employee?.salary || "N/A"}</p>
          </div>

          <div className="flex flex-col rounded-lg border p-4 shadow">
            <p className="font-semibold text-base sm:text-lg">Date of birth</p>
            <p className="text-muted-foreground text-sm">{employee?.date_of_birth || "N/A"}</p>
          </div>

          <div className="flex flex-col rounded-lg border p-4 shadow">
            <p className="font-semibold text-base sm:text-lg">Contact Number</p>
            <p className="text-muted-foreground text-sm">{employee?.user_phone_number || "N/A"}</p>
          </div>

          <div className="flex flex-col rounded-lg border p-4 shadow">
            <p className="font-semibold text-base sm:text-lg">Status</p>
            <p className="text-muted-foreground text-sm">{employee?.is_candidate ? "Candidate" : "Employee"}</p>
          </div>

          <div className="flex flex-col rounded-lg border p-4 shadow">
            <p className="font-semibold text-base sm:text-lg">Role Model</p>
            <p className="w-full text-muted-foreground text-sm">{employee?.is_role_model ? "Yes" : "No"}</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex h-full flex-col gap-5 md:grid md:grid-cols-2">
        <div className="order-1 lg:order-2">
          <EmployeeFile />
        </div>

        <div className="order-1 flex h-full flex-col gap-5 rounded-xl border p-4 md:order-2 md:col-span-1">
          <div className="flex flex-col gap-3">
            <Label className="font-semibold text-primary text-xl">Chat Results</Label>
            <ChartBarDefault />
          </div>
        </div>
      </div>

      <EmployeeSheet open={open} setOpen={setOpen} employee={employee} id={id} companyId={id ?? ""} />

      <UploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onUpload={handleUpload}
        companyId={companyId}
        employeeId={id!}
      />
    </div>
  );
};

export default UserDetails;
