// RTK Query API using Redux Toolkit
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseURl";

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/auth`,
    credentials: 'include', // This means cookies (like session tokens) will be included in the requests, which is necessary for maintaining sessions across requests.
  }),
  // defining the endpoints
  tagTypes:['User'],
  endpoints: (builder) => ({
    registerUser: builder.mutation({ // if u want to post something to the backend we use mutation
      query: (newUser) => ({
        url: "/register", // extracting from postman
        method: "POST",
        body: newUser
      })
    }),
    loginUser: builder.mutation({ // if u want to post something to the backend we use mutation
      query: (credentials) => ({
        url: "/login", // extracting from postman
        method: "POST",
        body: credentials
      })
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout", 
        method: "POST",
      })
    }),
    getUser: builder.query({
      query: () => ({
        url: "/users", // extracting from postman
        method: "GET",
      }),
      refetchOnMount: true, // This makes the query automatically re-fetch when the component using this hook mounts, ensuring up-to-date data.
           
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,        
        method: "DELETE",
      }),
      invalidatesTags: ["user"],       
    }),
    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/users/${userId}`,       
        method: "PUT",
        body: { role }
      }),
      refetchOnMount: true,
      invalidatesTags: ["User"],
    }),
    editProfile: builder.mutation({
      query: (profileData) => ({
        url: "/edit-profile",       
        method: "PATCH",
        body: { profileData }
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserQuery,
  useDeleteUserMutation,
  useEditProfileMutation,
  useUpdateUserRoleMutation,
} = authApi;

export default authApi;
