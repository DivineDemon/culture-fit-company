import { zodResolver } from "@hookform/resolvers/zod";
import { Briefcase, Globe, Loader2, Mail, MapPin, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import * as z from "zod";
import CulturePolicies from "@/components/shared/company-policy";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { companySchema } from "@/lib/form-schemas";
import type { RootState } from "@/store";
import { useGetCompanyQuery, useUpdateCompanyMutation } from "@/store/services/company";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const companyId = useSelector((state: RootState) => state.global.id);

  const { data, isLoading } = useGetCompanyQuery(companyId, {
    refetchOnMountOrArgChange: true,
  });

  const [updateCompany, { isLoading: isUpdating }] = useUpdateCompanyMutation();

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
        setIsEditing(false);
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
    <div className="h-full w-full overflow-auto rounded-lg bg-gradient-to-b from-background to-muted/30 px-6 py-10">
      <div className="flex flex-col items-center gap-6 border-b pb-8 sm:flex-row sm:items-start">
        <div className="flex w-full flex-col gap-3 text-center sm:text-left">
          <div>
            <h1 className="font-bold text-3xl text-primary">{data?.company_name}</h1>
            <span className="pb-4 text-muted-foreground">{data?.company_email || "—"}</span>
          </div>
          <p className="max-w-2xl text-muted-foreground">{data?.company_description || "No description available"}</p>
        </div>

        <div className="flex gap-3 self-center sm:self-start">
          <Button variant={isEditing ? "outline" : "default"} size="lg" onClick={() => setIsEditing((prev) => !prev)}>
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 pt-8 sm:grid-cols-3">
        <div className="col-span-2 flex flex-col gap-6">
          {isEditing ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="owner_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Owner Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter company type" {...field} />
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
                        <Input placeholder="Enter company type" {...field} />
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
                        <Input placeholder="Enter company type" {...field} />
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
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Write about your company..." className="min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="col-span-2 flex w-full items-end justify-end">
                  <Button type="submit" disabled={isUpdating} className="">
                    {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2 rounded-lg border p-4 shadow">
                <Label className="text-muted-foreground text-sm">Company Email</Label>
                <div className="flex items-center gap-2 font-medium text-[15px]">
                  <Mail className="h-4 w-4 text-primary" />
                  {data?.company_email || "—"}
                </div>
              </div>
              <div className="flex flex-col gap-2 rounded-lg border p-4 shadow">
                <Label className="text-muted-foreground text-sm">Owner Name</Label>
                <div className="flex items-center gap-2 font-medium text-[15px]">
                  <User className="h-4 w-4 text-primary" />
                  {data?.owner_name || "—"}
                </div>
              </div>
              <div className="flex flex-col gap-2 rounded-lg border p-4 shadow">
                <Label className="text-muted-foreground text-sm">Owner Email</Label>
                <div className="flex items-center gap-2 font-medium text-[15px]">
                  <Mail className="h-4 w-4 text-primary" />
                  {data?.owner_email || "—"}
                </div>
              </div>
              <div className="flex flex-col gap-2 rounded-lg border p-4 shadow">
                <Label className="text-muted-foreground text-sm">Industry</Label>
                <div className="flex items-center gap-2 font-medium text-[15px]">
                  <Briefcase className="h-4 w-4 text-primary" />
                  {data?.company_type || "—"}
                </div>
              </div>
              <div className="flex flex-col gap-2 rounded-lg border p-4 shadow">
                <Label className="text-muted-foreground text-sm">Location</Label>
                <div className="flex items-center gap-2 font-medium text-[15px]">
                  <MapPin className="h-4 w-4 text-primary" />
                  {data?.company_address || "—"}
                </div>
              </div>
              <div className="flex flex-col gap-2 rounded-lg border p-4 shadow">
                <Label className="text-muted-foreground text-sm">Website</Label>
                <div className="flex items-center gap-2 font-medium text-[15px]">
                  <Globe className="h-4 w-4 text-primary" />
                  {data?.company_website ? (
                    <a
                      href={data.company_website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline"
                    >
                      {data.company_website}
                    </a>
                  ) : (
                    "—"
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2 rounded-lg border p-4 shadow sm:col-span-2">
                <Label className="text-muted-foreground text-sm">Description</Label>
                <p className="flex items-center gap-2 font-medium text-[16px]">
                  {data?.company_description || "No description provided"}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-1 h-full">
          <CulturePolicies />
        </div>
      </div>
    </div>
  );
};

export default Profile;
