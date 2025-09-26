declare type GlobalState = {
  employee: null | any;
  token: string;
  id: string;
}

declare type PostLogin = {
    email: string;
    password: string;
  }

declare type PostLoginResponse = {
    status: string;
    message: string;
    data: {
      access_token: string;
      company_id: string;
    };
  }


declare type employees = {
    id: string;
    company_id: string;
    user_id: string;
    first_name: string;
    last_name: string;
    password: string;
    email: string;
    position: string;
    salary: number;
    is_candidate: boolean;
    files: string[];
    temp_password: string;
  }

