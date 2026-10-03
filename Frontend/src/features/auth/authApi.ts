import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { LoginRequest,LoginResponse,RegisterRequest,User } from "./authTypes";
export const authApi=createApi({reducerPath:"authApi",baseQuery:fetchBaseQuery({baseUrl:import.meta.env.VITE_BASE_URL}),tagTypes:["Auth"],endpoints:b=>({login:b.mutation<LoginResponse,LoginRequest>({query:body=>({url:"/login",method:"POST",body}),invalidatesTags:["Auth"]}),register:b.mutation<LoginResponse,RegisterRequest>({query:body=>({url:"/users/register",method:"POST",body}),invalidatesTags:["Auth"]}),me:b.query<User,void>({query:()=>"/users/me",providesTags:["Auth"]})})});
export const {useLoginMutation,useRegisterMutation,useMeQuery}=authApi;
