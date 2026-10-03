import {createSlice,PayloadAction} from "@reduxjs/toolkit"; import type {User} from "./userTypes";
interface UserState{profile:User|null} const initialState:UserState={profile:null};
const slice=createSlice({name:"user",initialState,reducers:{setProfile:(s,a:PayloadAction<User>)=>{s.profile=a.payload},clearProfile:s=>{s.profile=null}}}); export const {setProfile,clearProfile}=slice.actions; export default slice.reducer;
