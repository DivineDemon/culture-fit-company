import { Star } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { Employee } from "./columns";

interface UserSheetProps {
  id?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  employee?: Employee;
}

const UserSheet = ({ id, open, setOpen, employee }: UserSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-full min-w-xl">
        <SheetHeader>
          <SheetTitle>{id ? "Employee Details" : "User Details"}</SheetTitle>
          <SheetDescription>{id ? "View employee information" : "Your profile information"}</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-3 p-3">
          <div className="grid grid-cols-3 items-start gap-2 border-b pb-2">
            <Label className="text-muted-foreground text-sm">Name</Label>
            <p className="col-span-2 font-medium text-foreground text-sm capitalize">{employee?.name || "N/A"}</p>
          </div>

          <div className="grid grid-cols-3 items-start gap-2 border-b pb-2">
            <Label className="text-muted-foreground text-sm">Email</Label>
            <p className="col-span-2 font-medium text-foreground text-sm">{employee?.email || "N/A"}</p>
          </div>

          <div className="grid grid-cols-3 items-start gap-2 border-b pb-2">
            <Label className="text-muted-foreground text-sm">Date of Birth</Label>
            <p className="col-span-2 font-medium text-foreground text-sm">{employee?.date_of_birth || "N/A"}</p>
          </div>

          <div className="grid grid-cols-3 items-start gap-2 border-b pb-2">
            <Label className="text-muted-foreground text-sm">Contact Number</Label>
            <p className="col-span-2 font-medium text-foreground text-sm">{employee?.user_phone_number || "N/A"}</p>
          </div>

          <div className="grid grid-cols-3 items-start gap-2 border-b pb-2">
            <Label className="text-muted-foreground text-sm">Designation</Label>
            <p className="col-span-2 font-medium text-foreground text-sm">{employee?.user_designation || "N/A"}</p>
          </div>

          <div className="grid grid-cols-3 items-start gap-2 border-b pb-2">
            <Label className="text-muted-foreground text-sm">Department</Label>
            <p className="col-span-2 font-medium text-foreground text-sm">{employee?.department || "N/A"}</p>
          </div>

          <div className="grid grid-cols-3 items-start gap-2 border-b pb-2">
            <Label className="text-muted-foreground text-sm">Company Role Model</Label>
            <p className="col-span-2 flex items-center gap-1 font-medium text-foreground text-sm">
              {employee?.is_role_model ? "Yes" : "No"}
              <span className="flex items-center">
                {employee?.is_role_model &&
                  [1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  ))}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-3 items-start gap-2 border-b pb-2">
            <Label className="text-muted-foreground text-sm">Employee Type</Label>
            <p className="col-span-2 font-medium text-foreground text-sm">
              {employee?.is_candidate ? "Candidate" : "Employee"}
            </p>
          </div>

          <div className="grid grid-cols-3 items-start gap-2 border-b pb-2">
            <Label className="text-muted-foreground text-sm">Salary</Label>
            <p className="col-span-2 font-medium text-foreground text-sm">
              {employee?.salary ? `$${employee.salary}` : "N/A"}
            </p>
          </div>

          <div className="grid grid-cols-3 items-start gap-2 border-b pb-2">
            <Label className="text-muted-foreground text-sm">File(s)</Label>
            <div className="col-span-2 flex flex-col gap-1">
              {employee?.files && employee.files.length > 0 ? (
                employee.files.map((file) => (
                  <p key={file.id} className="truncate font-medium text-foreground text-sm" title={file.file_name}>
                    {file.file_name || "N/A"}
                  </p>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">No files uploaded</p>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UserSheet;
