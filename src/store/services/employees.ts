import { api } from "./core";

export const employees = api.injectEndpoints({
  endpoints: (build) => ({
    getEmployees: build.query({
      query: (id: string) => ({
        url: `/employees/company/${id}`,
        method: "GET",
      }),
    }),

    postEmployee: build.mutation<Employees, { companyId: string; data: Employees }>({
      query: ({ companyId, data }) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        if (data.password) formData.append("password", data.password);
        formData.append("date_of_birth", data.date_of_birth);
        formData.append("user_phone_number", data.user_phone_number);
        formData.append("user_designation", data.user_designation);
        formData.append("department", data.department);
        formData.append("salary", String(data.salary));
        formData.append("is_role_model", String(data.is_role_model));
        formData.append("is_candidate", String(data.is_candidate));
        formData.append("company_id", companyId);

        if (data.files && data.files.length > 0) {
          for (const file of data.files) {
            formData.append("files", file);
          }
        }

        return {
          url: `/employees/company/${companyId}`,
          method: "POST",
          body: formData,
        };
      },
      transformResponse: (response: { data: Employees }) => response.data,
    }),

    updateEmployee: build.mutation<Employees, { companyId: string; data: Employees; id: string }>({
      query: ({ companyId, data, id }) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        if (data.password) formData.append("password", data.password);
        formData.append("date_of_birth", data.date_of_birth);
        formData.append("user_phone_number", data.user_phone_number);
        formData.append("user_designation", data.user_designation);
        formData.append("department", data.department);
        formData.append("salary", String(data.salary));
        formData.append("is_role_model", String(data.is_role_model));
        formData.append("is_candidate", String(data.is_candidate));
        formData.append("company_id", companyId);

        if (data.files && data.files.length > 0) {
          for (const file of data.files) {
            formData.append("files", file);
          }
        }

        return {
          url: `/employees/company/${companyId}/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      transformResponse: (response: { data: Employees }) => response.data,
    }),

    getEmployeebyId: build.query({
      query: ({ companyId, id }: { companyId: string; id: string }) => ({
        url: `/employees/company/${companyId}/${id}`,
        method: "GET",
      }),
      transformResponse: (response: Employees) => response,
    }),

    getEmployeefiles: build.query({
      query: ({ companyId, id }: { companyId: string; id: string }) => ({
        url: `/employees/company/${companyId}/${id}/files`,
        method: "GET",
      }),
    }),

  }),
});

export const {
  useGetEmployeesQuery,
  usePostEmployeeMutation,
  useUpdateEmployeeMutation,
  useGetEmployeefilesQuery,
  useGetEmployeebyIdQuery,
} = employees;
