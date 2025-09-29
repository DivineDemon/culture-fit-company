import { setId, setToken } from "../slices/global";
import { api } from "./core";

export const endpoints = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data: PostLogin) => ({
        url: "/auth/company/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = (await queryFulfilled) as { data: PostLoginResponse };
        dispatch(setToken(data.access_token));
        dispatch(setId(data.company_id));
      },
      transformResponse: (response: { status: string; message: string; data: PostLoginResponse }) => response.data,
    }),
  }),
});

export const { useLoginMutation } = endpoints;
