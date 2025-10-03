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
        return {
          url: `/employees/company/${companyId}`,
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
      transformResponse: (response: { data: Employees }) => response.data,
    }),

    updateEmployee: build.mutation<Employees, { companyId: string; data: Employees; id: string }>({
      query: ({ companyId, data, id }) => ({
        url: `/employees/company/${companyId}/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
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
