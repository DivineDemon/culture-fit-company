import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_API_URL as string,
});

const baseQueryWith401Handling: typeof baseQuery = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401 || result.error?.status === 403) {
    localStorage.clear();
    window.location.replace("/");
    toast.error("Session Expired! Please Login Again.");
  }

  return result;
};

export const api = createApi({
  baseQuery: baseQueryWith401Handling,
  keepUnusedDataFor: 5,
  tagTypes: [
    "User",
    "consolidation",
    "Supplier",
    "Suppliers",
    "Competitor",
    "Competitors",
    "Product",
    "Products",
    "AI",
  ],
  endpoints: (build) => ({
    healthCheck: build.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      transformResponse: (response: { status: string; message: string }) => response,
    }),
  }),
});
