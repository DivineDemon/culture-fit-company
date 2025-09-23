import { zodResolver } from "@hookform/resolvers/zod";
import { type Dispatch, type SetStateAction, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { employeeSchema } from "@/lib/form-schemas";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import type { Employee } from "./columns";

interface EmployeeSheetProps {
  id?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  employee?: Employee;
}

const EmployeeSheet = ({ id, open, setOpen, employee }: EmployeeSheetProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
    defaultValues: employee
      ? {
          name: employee.name,
          email: employee.email,
          password: employee.password,
          user_designation: employee.user_designation,
          department: employee.department,
          is_role_model: employee.is_role_model,
          contact_number: employee.contact_number,
          date_of_birth: employee.date_of_birth,
        }
      : {
          name: "",
          email: "",
          password: "",
          user_designation: "",
          department: "",
          is_role_model: false,
          contact_number: "",
          date_of_birth: "",
        },
  });

  const onSubmit = () => {
    setOpen(false);
  };

  // Dropzone for file upload
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

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{id ? "Edit" : "Add"} Employee</SheetTitle>
          <SheetDescription>{id ? "Update employee details" : "Add a new employee to your account"}</SheetDescription>
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
                    Full Name<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
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
                    <Input type="email" placeholder="john@example.com" {...field} />
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
                    <Input type="password" placeholder="******" {...field} />
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
                    <Input placeholder="Software Engineer" {...field} />
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
                    <Input placeholder="IT / HR / Finance" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Is Role Model */}
            <FormField
              control={form.control}
              name="is_role_model"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-2">
                  <div className="space-y-0.5">
                    <FormLabel>
                      Is Role Model?
                      <span className="text-destructive">*</span>
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Contact Number */}
            <FormField
              control={form.control}
              name="contact_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input placeholder="0300 1234567" {...field} />
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

            {/* File Uploader */}
            <div className="flex flex-col gap-2">
              <FormLabel>Upload File</FormLabel>
              <div
                {...getRootProps()}
                className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-border border-dashed bg-muted/30 px-5 py-10 text-center transition hover:bg-muted/50"
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <span className="font-medium text-base">Drop the file here...</span>
                ) : (
                  <>
                    <span className="font-medium text-base">Drag & Drop your file here</span>
                    <span className="text-muted-foreground text-sm">or click to browse</span>
                  </>
                )}
              </div>
              {uploadedFile && <Label className="text-primary text-sm">Selected File: {uploadedFile.name}</Label>}
            </div>

            <Button type="submit" className="w-full">
              {id ? "Update Employee" : "Add Employee"}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default EmployeeSheet;
