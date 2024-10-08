import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logIn, logOut } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.user?.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQyeryWithRefreshToken = async (args, api, extraOptions) => {
  let response = await baseQuery(args, api, extraOptions);

  if (response?.error?.originalStatus == 403) {
    const refreshResponse = await baseQuery(
      "/auth/new_access_token",
      api,
      extraOptions
    );

    if (refreshResponse?.data) {
      api.dispatch(logIn({ ...refreshResponse.data }));
      response = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return response;
};

export const baseApiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQyeryWithRefreshToken,
  tagTypes: ["User", "Customer", "Document"],
  endpoints: (builder) => ({}),
});
