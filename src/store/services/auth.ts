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
        dispatch(setToken(data.data.access_token));
        dispatch(setId(data.data.company_id));
      },
    }),
  }),
});

export const { useLoginMutation } = endpoints;
