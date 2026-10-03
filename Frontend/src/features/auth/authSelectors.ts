import type { RootState } from "../../app/store";
export const selectAuth=(s:RootState)=>s.auth;
export const selectCurrentUser=(s:RootState)=>s.auth.user;
export const selectToken=(s:RootState)=>s.auth.token;
export const selectIsAuthenticated=(s:RootState)=>s.auth.isAuthenticated;
