export const API_ROUTES = {
  products: "/api/contenidos",
  login: "/api/auth/login",
  register: "/api/auth/register",
  logout: "/api/auth/logout",
  refreshToken: "/api/auth/refresh",
  user: (id: string) => `/api/users/${id}`,
  upgradePremium: (id: string) => `/api/users/${id}/premium`,
  catalog: "/api/contenidos",
  catalogSearch: "/api/contenidos",
  generos: "/api/generos",
  favorites: "/api/favorites",
} as const;

export const STORAGE_KEYS = {
  token: "auth_token",
  user: "auth_user",
} as const;

export const MAX_FREE_FAVORITES = 5;
