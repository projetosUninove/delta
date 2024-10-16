// src/app/core/types/login-response.model.ts

export interface LoginResponse {
  tokenJWT: string;
  userId: number | string;
  email: string;
  role: string;
  message?: string;
  success?: boolean;
}

export function parseLoginResponse(response: any): LoginResponse {
  return {
    tokenJWT: response.tokenJWT,
    userId: response.userId,
    email: response.email,
    role: response.role,
    message: response.message,
    success: response.success
  };
}

export function isLoggedIn(response: LoginResponse): boolean {
  return !!response.tokenJWT && response.success === true;
}
