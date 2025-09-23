import { z } from "zod";

export const employeeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  user_designation: z.string().min(2, "Designation must be at least 2 characters"),
  department: z.string().min(2, "Department must be at least 2 characters"),
  is_role_model: z.boolean(),
  contact_number: z.string().regex(/^[0-9]{10,15}$/, "Contact number must be 10–15 digits"),
  date_of_birth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date of birth must be in format YYYY-MM-DD"),
});
