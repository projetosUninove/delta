export interface LoginResponse {
    token?: string; 
    userId?: number | string; 
    email?: string; 
    role?: string; 
    message?: string; 
    success?: boolean; 
   
  }
  
  export class LoginResponseImpl implements LoginResponse {
    constructor(
      public token?: string,
      public userId?: number | string,
      public email?: string,
      public role?: string,
      public message?: string,
      public success?: boolean
    ) {}
  }
  