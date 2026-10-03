export interface User{_id:string;name:string;email:string;role?:string|{_id:string;name:string};gender?:string;profileImage?:string;isPremium?:boolean;}
export interface AuthState{user:User|null;token:string|null;isAuthenticated:boolean;}
export interface LoginRequest{email:string;password:string;}
export interface RegisterRequest{name:string;email:string;password:string;gender:string;}
export interface LoginResponse{message?:string;token:string;user:User;}
