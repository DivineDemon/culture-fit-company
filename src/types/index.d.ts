declare type GlobalState = {
  employee: null | any;
  token: string;
  id: string;
  mode: "employees" | "candidates";
};

declare type PostLogin = {
  email: string;
  password: string;
};

declare type PostLoginResponse = {
  access_token: string;
  company_id: string;
};


declare type Employees = {
  id: string;
  company_id: string;
  user_id: string;
  name: string;
  email: string;
  password: string;
  date_of_birth: string;
  user_phone_number: string;
  user_designation: string;
  department: string;
  salary: number;
  is_role_model: boolean;
  is_candidate: boolean;
  files: string[];
};

interface FileItem {
  id: string;
  file_name: string;
};

declare type CompanyInfo = {
  id?: string;
  company_name: string;
  company_email: string;
  owner_name: string;
  owner_email: string;
  company_website: string;
  company_type: string;
  phone_number: string;
  company_address: string;
  company_description: string;
};

declare type Policy = {
  id: string;
  company_id: string;
  file_name: string;
  file_size: number;
  description: string | null;
};