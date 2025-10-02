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

  salary: z.number().min(0, "Salary must be a positive number"),

  is_candidate: z.boolean().default(false).optional(),
  is_role_model: z.boolean().default(false).optional(),
});
