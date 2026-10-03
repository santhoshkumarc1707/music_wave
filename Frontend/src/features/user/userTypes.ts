export interface User{_id:string;name:string;email:string;gender?:string;profileImage?:string;role?:string|{_id:string;name:string};isPremium?:boolean;}
export interface UpdateUserRequest{name?:string;gender?:string;profileImage?:string;}
