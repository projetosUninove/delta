export interface LoginResponse {
    token?: string; 
    userId?: number | string; 
    email?: string; 
    role?: string; 
    message?: string; 
    success?: boolean; 
   
  }
  

  export interface LoginResponse {
    tokenJWT: string; 
    message?: string; 
  }
  