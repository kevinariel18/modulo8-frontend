export type UserId = string;

export interface User {
  id: UserId;
  email: string;
  displayName: string;
  isPremium: boolean;
  createdAt: Date;
}

export interface Auth {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  displayName: string;
}
