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
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{id ? "Employee Details" : "User Details"}</SheetTitle>
          <SheetDescription>{id ? "View employee information" : "Your profile information"}</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-3 p-3">
          <div className="grid grid-cols-3 items-start gap-2 border-b pb-2">
            <Label className="text-muted-foreground text-sm">Name</Label>
            <p className="col-span-2 font-medium text-foreground text-sm">{employee?.name}</p>
          </div>

          <div className="grid grid-cols-3 items-start gap-2 border-b pb-2">
            <Label className="text-muted-foreground text-sm">Email</Label>
            <p className="col-span-2 font-medium text-foreground text-sm">{employee?.email}</p>
          </div>

          <div className="grid grid-cols-3 items-start gap-2 border-b pb-2">
            <Label className="text-muted-foreground text-sm">Designation</Label>
            <p className="col-span-2 font-medium text-foreground text-sm">{employee?.user_designation}</p>
          </div>

          <div className="grid grid-cols-3 items-start gap-2 border-b pb-2">
            <Label className="text-muted-foreground text-sm">Department</Label>
            <p className="col-span-2 font-medium text-foreground text-sm">{employee?.department}</p>
          </div>

          <div className="grid grid-cols-3 items-start gap-2 border-b pb-2">
            <Label className="text-muted-foreground text-sm">Role Model</Label>
            <p className="col-span-2 font-medium text-foreground text-sm">{employee?.is_role_model ? "Yes" : "No"}</p>
          </div>

          <div className="grid grid-cols-3 items-start gap-2 border-b pb-2">
            <Label className="text-muted-foreground text-sm">Contact Number</Label>
            <p className="col-span-2 font-medium text-foreground text-sm">{employee?.contact_number}</p>
          </div>

          <div className="grid grid-cols-3 items-start gap-2 border-b pb-2">
            <Label className="text-muted-foreground text-sm">Date of Birth</Label>
            <p className="col-span-2 font-medium text-foreground text-sm">{employee?.date_of_birth}</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UserSheet;
