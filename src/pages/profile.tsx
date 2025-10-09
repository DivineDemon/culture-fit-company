import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { companySchema, passwordSchema } from "@/lib/form-schemas";
import { cn } from "@/lib/utils";
import { useGetCompanyQuery, useUpdateCompanyMutation, useUpdatePasswordMutation } from "@/store/services/company";
import type { RootState } from "@/types/global";

const Profile = () => {
  const companyId = useSelector((state: RootState) => state.global.id);

  const { data, isLoading } = useGetCompanyQuery(companyId, {
    refetchOnMountOrArgChange: true,
  });

  const [updateCompany, { isLoading: isUpdating }] = useUpdateCompanyMutation();
  const [updatePassword, { isLoading: isUpdatingPassword }] = useUpdatePasswordMutation();

  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      company_name: "",
      company_email: "",
      owner_name: "",
      owner_email: "",
      company_website: "",
      company_type: "",
      phone_number: "",
      company_address: "",
      company_description: "",
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        company_name: data.company_name ?? "",
        company_email: data.company_email ?? "",
        owner_name: data.owner_name ?? "",
        owner_email: data.owner_email ?? "",
        company_website: data.company_website ?? "",
        company_type: data.company_type ?? "",
        phone_number: data.phone_number ?? "",
        company_address: data.company_address ?? "",
        company_description: data.company_description ?? "",
      });
    }
  }, [data, form]);

  const onSubmit = async (values: z.infer<typeof companySchema>) => {
    if (!companyId) return;

    try {
      const response = await updateCompany({
        id: companyId,
        data: {
          id: "",
          company_name: values.company_name ?? "",
          company_email: values.company_email ?? "",
          owner_name: values.owner_name ?? "",
          owner_email: values.owner_email ?? "",
          company_website: values.company_website ?? "",
          company_type: values.company_type ?? "",
          phone_number: values.phone_number ?? "",
          company_address: values.company_address ?? "",
          company_description: values.company_description ?? "",
        },
      });

      if (!response) {
        toast.success("Company updated successfully!");
      }
    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast.error(err.data?.message || "Something went wrong. Please try again!");
    }
  };

  const onPasswordSubmit = async (values: z.infer<typeof passwordSchema>) => {
    try {
      const response = await updatePassword({
        id: companyId,
        data: {
          old_password: values.currentPassword,
          new_password: values.newPassword,
        },
      });
      if (response) {
        toast.success("Password updated successfully!");
        passwordForm.reset();
      }
    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast.error(err.data?.message || "Something went wrong. Please try again!");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="size-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-5 overflow-auto">
      <div className="flex w-full items-center justify-center">
        <div className="flex w-full flex-col items-start justify-start gap-2">
          <span className="w-full text-left font-bold text-[30px] text-primary leading-[30px]">
            {data?.company_name}
          </span>
          <span className="w-full text-left text-[16px] text-muted-foreground leading-[16px]">
            {data?.company_email || "—"}
          </span>
        </div>
        <div className="flex w-full items-center justify-end gap-2.5">
          <Link
            to="/documents"
            className={cn(
              buttonVariants({
                variant: "default",
                size: "lg",
              }),
            )}
          >
            Manage Documents
          </Link>
        </div>
      </div>

      {/* Update Profile Section */}
      <div className="flex h-full w-full flex-col items-start justify-start gap-5 rounded-xl border bg-card p-5 shadow">
        <span className="w-full text-left font-bold text-[20px] text-primary leading-[20px]">Update Profile</span>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid w-full grid-cols-3 items-start justify-start gap-5"
          >
            <FormField
              control={form.control}
              name="owner_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Owner Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter owner name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="owner_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Owner Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter owner email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter industry type" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter company address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company_website"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter company website" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company_description"
              render={({ field }) => (
                <FormItem className="sm:col-span-3">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write about your company..."
                      className="min-h-[100px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-3 flex w-full items-center justify-end">
              <Button type="submit" disabled={isUpdating} variant="default" size="lg">
                {isUpdating ? <Loader2 className="animate-spin" /> : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {/* ✅ Update Password Section */}
      <div className="flex h-full w-full flex-col items-start justify-start gap-5 rounded-xl border bg-card p-5 shadow">
        <span className="w-full text-left font-bold text-[20px] text-primary leading-[20px]">Update Password</span>
        <Form {...passwordForm}>
          <form
            onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
            className="grid w-full grid-cols-3 items-start justify-start gap-5"
          >
            <FormField
              control={passwordForm.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter current password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={passwordForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter new password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={passwordForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Confirm new password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-3 flex w-full items-center justify-end">
              <Button type="submit" disabled={isUpdatingPassword} variant="default" size="lg">
                {isUpdatingPassword ? <Loader2 className="animate-spin" /> : "Update Password"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
