export type UserId = string;

export interface User {
  id: UserId;
  email: string;
  displayName: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
