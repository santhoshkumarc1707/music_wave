import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "./authTypes";
const initialState: AuthState={user:null,token:null,isAuthenticated:false};
const authSlice=createSlice({name:"auth",initialState,reducers:{setCredentials:(s,a:PayloadAction<{user:User;token:string}>)=>{s.user=a.payload.user;s.token=a.payload.token;s.isAuthenticated=true;},logout:(s)=>{s.user=null;s.token=null;s.isAuthenticated=false;}}});
export const {setCredentials,logout}=authSlice.actions; export default authSlice.reducer;
