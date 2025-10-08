import { zodResolver } from "@hookform/resolvers/zod";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import type z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { employeeSchema } from "@/lib/form-schemas";
import type { RootState } from "@/store";
import { usePostEmployeeMutation, useUpdateEmployeeMutation } from "@/store/services/employees";
import UploadModal from "../shared/file-uploader";
import { Switch } from "../ui/switch";
import type { Employee } from "./columns";

interface EmployeeSheetProps {
  id?: string;
  open: boolean;
  companyId: string;
  employee?: Employee;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const EmployeeSheet = ({ id, open, setOpen, employee, companyId }: EmployeeSheetProps) => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const { mode } = useSelector((state: RootState) => state.global);
  const [postEmployee, { isLoading: isLoadingPost }] = usePostEmployeeMutation();
  const [updateEmployee, { isLoading: isLoadingUpdate }] = useUpdateEmployeeMutation();

  const handleUpload = () => {
    // Files are handled by the upload modal
  };

  const form = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: "",
      email: "",
      department: "",
      date_of_birth: "",
      salary: undefined,
      is_candidate: false,
      is_role_model: false,
      user_designation: "",
      user_phone_number: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof employeeSchema>) => {
    try {
      if (id) {
        const response = await updateEmployee({
          id,
          data: {
            ...data,
            files: [],
            id: id ?? "",
            company_id: companyId,
            salary: data.salary ?? 0,
            user_id: employee?.id ?? "",
            password: data.password ?? "",
            is_candidate: mode === "candidates" ? true : false,
            is_role_model: mode === "employees" ? (data.is_role_model ?? false) : false,
          },
          companyId,
        });

        if (response) {
          toast.success("Employee Updated Successfully!");
          setOpen(false);
          window.location.reload();
          return;
        } else {
          toast.error("Something went wrong, Please try again!");
        }
      } else {
        const response = await postEmployee({
          companyId,
          data: {
            ...data,
            files: [],
            id: id ?? "",
            company_id: companyId,
            salary: data.salary ?? 0,
            user_id: employee?.id ?? "",
            password: data.password ?? "",
            is_candidate: mode === "candidates" ? true : false,
            is_role_model: mode === "employees" ? (data.is_role_model ?? false) : false,
          },
        });

        if ("data" in response) {
          toast.success("Employee Created Successfully!");
          setOpen(false);
          return;
        } else {
          toast.error("Something went wrong, Please try again!");
        }
      }
      setOpen(false);
    } catch {
      toast.error("Unexpected error occurred!");
    }
  };

  useEffect(() => {
    if (id && employee) {
      form.reset({
        name: employee.name ?? "",
        email: employee.email ?? "",
        password: employee.password ?? "",
        user_designation: employee.user_designation ?? "",
        department: employee.department ?? "",
        user_phone_number: employee.user_phone_number ?? "",
        date_of_birth: employee.date_of_birth ?? "",
        salary: employee.salary ?? 0,
        is_candidate: employee.is_candidate ?? false,
        is_role_model: employee.is_role_model ?? false,
      });
    }
  }, [id, employee, form]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {id ? "Edit" : "Add"}&nbsp;
            {mode === "employees" ? "Employee" : "Candidate"}
          </SheetTitle>
          <SheetDescription>
            {id
              ? `Update ${mode === "employees" ? "employee" : "candidate"} details`
              : `Add a new ${mode === "employees" ? "employee" : "candidate"} to your account`}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-full flex-col gap-5 overflow-auto px-4 pb-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Password<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter password" {...field} value={field.value as string} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="user_designation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Designation<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter designation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Department<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter department" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="user_phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Phone Number<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date_of_birth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter salary"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === "" ? undefined : Number(value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {mode === "employees" && (
              <FormField
                control={form.control}
                name="is_role_model"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-3">
                    <FormLabel className="text-base">Is Role Model?</FormLabel>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            {id && (
              <div className="flex flex-col gap-2">
                <FormLabel>Upload File</FormLabel>
                <div
                  onClick={() => setUploadModalOpen(true)}
                  className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-border border-dashed bg-muted/30 px-5 py-10 text-center transition hover:bg-muted/50"
                >
                  <span className="font-medium text-base">Click to upload or drag files</span>
                  <span className="text-muted-foreground text-sm">Opens upload dialog</span>
                </div>
              </div>
            )}
            <Button type="submit" className="mt-auto w-full" disabled={isLoadingPost || isLoadingUpdate}>
              {id
                ? `Update ${mode === "employees" ? "Employee" : "Candidate"}`
                : `Add ${mode === "employees" ? "Employee" : "Candidate"}`}
            </Button>
          </form>
          <UploadModal
            open={uploadModalOpen}
            onClose={() => setUploadModalOpen(false)}
            onUpload={handleUpload}
            companyId={companyId}
            employeeId={id}
          />
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default EmployeeSheet;
