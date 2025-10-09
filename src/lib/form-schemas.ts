import { z } from "zod";

export const employeeSchema = z.object({
  name: z
    .string()
    .min(2, "Name is required")
    .regex(/^[A-Za-z\s]+$/, "Name must only contain letters"),

  email: z.string().email("Invalid email"),

  password: z.string().min(6, "Password must be at least 6 characters").nullable().optional(),

  user_designation: z
    .string()
    .min(2, "Designation is required")
    .regex(/^[A-Za-z\s]+$/, "Designation must only contain letters"),

  department: z.string().min(2, "Department is required"),

  user_phone_number: z
    .string()
    .min(6, "Phone number is required")
    .regex(/^[0-9]+$/, "Phone number must only contain digits"),

  date_of_birth: z.string().min(2, "Date of birth is required"),

  salary: z.number().min(0, "Salary must be a positive number").optional(),

  is_candidate: z.boolean().default(false).optional(),
  is_role_model: z.boolean().default(false).optional(),
});

export const companySchema = z.object({
  company_name: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .regex(/^[A-Za-z\s]+$/, "Company name must contain only alphabets"),

  company_email: z.string().email("Invalid company email address"),

  owner_name: z
    .string()
    .min(2, "Owner name must be at least 2 characters")
    .regex(/^[A-Za-z\s]+$/, "Owner name must contain only alphabets"),

  owner_email: z.string().email("Invalid owner email address"),

  company_size: z.string().optional(),

  company_type: z
    .string()
    .min(2, "Company type must be contain value")
    .regex(/^[A-Za-z\s]+$/, "Company type must contain only alphabets")
    .optional(),

  company_website: z.string().url("Invalid company_website URL").optional(),

  phone_number: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\+?[0-9]{1,4}[\s-]?(\([0-9]{1,4}\))?([\s-]?[0-9]{1,15})+$/, "Phone number must contain only numbers")
    .optional(),

  company_address: z.string().min(5, "Company address must be at least 5 characters").optional(),

  company_description: z.string().min(10, "Description must be at least 10 characters").optional(),
});

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, "Current password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
