declare type GlobalState = {
  employee: null | Employee;
  token: string;
  id: string;
  mode: "employees" | "candidates";
  openFolder: string;
  selectedFileId?: string;
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
  file_data: string;
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

declare type CompanyFile = {
  id: string;
  file_name: string;
  file_data: string;
}

declare type DocumentItem = {
  id: string;
  name: string;
  type: "folder" | "file";
};

declare type UpdatePassword = {
  old_password: string;
  new_password: string;
};

declare type Folder = {
  id: string;
  name: string;
  description: string;
  parent_id: string;
  company_id: string;
  files: string[];
  subfolders: string[]
};

declare type GetFolders = {
  company: {
    id: string;
    name: string;
    email: string;
  };
  files: {
    company_files: {
      id: string;
      file_name: string;
      file_data: string;
      type: string;
      created_at: string;
    }[];
    employee_files: {
      id: string;
      employee_id: string;
      file_name: string;
      file_data: string;
      type: string;
      created_at: string;
    }[];
  };
  folders: {
    id: string;
    name: string;
    description: string;
    parent_id?: string | null;
    created_at: string;
  }[];
  reports: {
    company_files_reports: {
      id: string;
      file_name: string;
      summary: string;
      score: number;
      created_at: string;
    }[];
    employee_culture_fit_reports: {
      id: string;
      file_name: null;
      summary: string;
      score: number;
      created_at: string;
    }[];
    candidate_culture_reports: {
      id: string;
      summary: string;
      score: number;
      created_at: string | null;
    }[];
    candidate_chat_reports: {
      id: string;
      summary: string;
      score: string;
      created_at: string;
    }[];
    role_model_employee_chat_reports: string[];
    company_employee_role_model_chat_reports: string[];
    final_reports: string[];
    candidate_and_role_model_reports: string[];
  };
  fetched_at: string;
};