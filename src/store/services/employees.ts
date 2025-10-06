import { api } from "./core";

export const employees = api.injectEndpoints({
  endpoints: (build) => ({
    getEmployees: build.query({
      query: (id: string) => ({
        url: `/employees/company/${id}`,
        method: "GET",
      }),
      providesTags: ["employees"],
    }),

    postEmployee: build.mutation({
      query: ({ companyId, data }: { companyId: string; data: Employees }) => ({
        url: `/employees/company/${companyId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["employees"],
      transformResponse: (response: { data: Employees }) => response.data,
    }),

    updateEmployee: build.mutation({
      query: ({ companyId, data, id }: { companyId: string; data: Employees; id: string }) => ({
        url: `/employees/company/${companyId}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["employees"],
      transformResponse: (response: { data: Employees }) => response.data,
    }),

    getEmployeebyId: build.query({
      query: ({ companyId, id }: { companyId: string; id: string }) => ({
        url: `/employees/company/${companyId}/${id}`,
        method: "GET",
      }),
      providesTags: ["employees"],
      transformResponse: (response: Employees) => response,
    }),

    getEmployeefiles: build.query({
      query: ({ companyId, id }: { companyId: string; id: string }) => ({
        url: `/employees/company/${companyId}/${id}/files`,
        method: "GET",
      }),
      providesTags: ["files"],
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
