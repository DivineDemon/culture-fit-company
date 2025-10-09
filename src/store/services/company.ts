import { api } from "./core";

export const companies = api.injectEndpoints({
  endpoints: (build) => ({
    getCompany: build.query({
      query: (id: string) => ({
        url: `/companies/${id}`,
        method: "GET",
      }),
      transformResponse: (response: { status: string; message: string; data: CompanyInfo }) => response.data,
    }),

    updateCompany: build.mutation({
      query: ({ id, data }: { id: string; data: CompanyInfo }) => ({
        url: `/companies/${id}/`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: { status: string; message: string; data: CompanyInfo }) => response.data,
      invalidatesTags: ["companies"],
    }),

    postPolicy: build.mutation({
      query: ({ id, data }: { id: string; data: Policy }) => ({
        url: `/companies/${id}/files`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["policies"],
    }),

    getPolicies: build.query({
      query: (id: string) => ({
        url: `/companies/${id}/files`,
        method: "GET",
      }),
      providesTags: ["policies"],
      transformResponse: (response: { status: string; message: string; data: Policy[] }) => response.data,
    }),

    downloadPolicy: build.query<Blob, { id: string; file_id: string }>({
      query: ({ id, file_id }) => ({
        url: `/companies/${id}/files/${file_id}`,
        method: "GET",
        responseHandler: (response) => response.blob(),
      }),
    }),

    updatePassword: build.mutation({
      query: ({ id, data }: { id: string; data: UpdatePassword }) => ({
        url: `/companies/${id}/update-password`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: { status: string; message: string; data: UpdatePassword }) => response.data,
    }),
  }),
});

export const {
  useGetCompanyQuery,
  useUpdateCompanyMutation,
  useGetPoliciesQuery,
  usePostPolicyMutation,
  useLazyDownloadPolicyQuery,
  useUpdatePasswordMutation,
} = companies;
