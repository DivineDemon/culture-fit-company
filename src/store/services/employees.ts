import { api } from "./core";

export const employees = api.injectEndpoints({
  endpoints: (build) => ({
    getEmployees: build.query({
      query: (id: string) => ({
        url: `/employees/company/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetEmployeesQuery } = employees;
