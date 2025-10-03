import { zodResolver } from "@hookform/resolvers/zod";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
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
import { Switch } from "../ui/switch";
import type { Employee } from "./columns";

interface EmployeeSheetProps {
  id?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  employee?: Employee;
  companyId: string;
}

const EmployeeSheet = ({ id, open, setOpen, employee, companyId }: EmployeeSheetProps) => {
  const { mode } = useSelector((state: RootState) => state.global);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const [postEmployee, { isLoading: isLoadingPost }] = usePostEmployeeMutation();
  const [updateEmployee, { isLoading: isLoadingUpdate }] = useUpdateEmployeeMutation();

  const form = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
  });

  const onSubmit = async (data: z.infer<typeof employeeSchema>) => {
    const payload = {
      id: id ?? "",
      user_id: employee?.id ?? "",
      company_id: companyId,
      is_role_model: data.is_role_model ?? false,
      is_candidate: data.is_candidate ?? false,
      ...data,
      salary: data.salary ?? 0,
      password: data.password ?? "",
      files: [],
    };

    try {
      if (id) {
        const response = await updateEmployee({ id, data: payload, companyId });

        if (response) {
          toast.success("Employee Updated Successfully!");
          setOpen(false);
          window.location.reload();
          return;
        } else {
          toast.error("Something went wrong, Please try again!");
        }
      } else {
        const response = await postEmployee({ companyId, data: payload });

        if ("data" in response) {
          toast.success("Employee Created Successfully!");
          setOpen(false);
          return;
        } else {
          toast.error("Something went wrong, Please try again!");
        }
      }
      setOpen(false);
    } catch (_error) {
      toast.error("Unexpected error occurred!");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setUploadedFile(acceptedFiles[0]);
      }
    },
    multiple: false,
    accept: {
      "application/pdf": [],
      "text/csv": [],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
      "application/vnd.ms-excel": [],
    },
  });

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
            {id ? "Edit" : "Add"}
            {mode === "employees" ? " Candidate" : " Employee"}
          </SheetTitle>
          <SheetDescription>
            {id
              ? `Update ${mode === "employees" ? "candidate" : "employee"} details`
              : `Add a new ${mode === "employees" ? "candidate" : "employee"} to your account`}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-full flex-col gap-5 overflow-auto px-4 pb-6">
            {/* Name */}
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

            {/* Email */}
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

            {/* Password */}
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

            {/* Designation */}
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

            {/* Department */}
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

            {/* Phone Number */}
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

            {/* Date of Birth */}
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

            {/* Salary */}
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter salary" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Candidate Switch */}
            {mode === "employees" && (
              <FormField
                control={form.control}
                name="is_candidate"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-3">
                    <FormLabel className="text-base">Is Candidate?</FormLabel>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            {/* Role Model Switch */}
            {mode === "candidates" && (
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

            {/* File Uploader */}
            <div className="flex flex-col gap-2">
              <FormLabel>Upload File</FormLabel>
              <div
                {...getRootProps()}
                className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-border border-dashed bg-muted/30 px-5 py-10 text-center transition hover:bg-muted/50"
              >
                <input {...getInputProps()} />
                {uploadedFile ? (
                  <span className="font-medium text-base text-primary">{uploadedFile.name}</span>
                ) : isDragActive ? (
                  <span className="font-medium text-base">Drop the file here...</span>
                ) : (
                  <>
                    <span className="font-medium text-base">Drag & Drop your file here</span>
                    <span className="text-muted-foreground text-sm">or click to browse</span>
                  </>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="mt-auto w-full" disabled={isLoadingPost || isLoadingUpdate}>
              {id
                ? `Update ${mode === "employees" ? "Candidate" : "Employee"}`
                : `Add ${mode === "employees" ? "Candidate" : "Employee"}`}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default EmployeeSheet;
