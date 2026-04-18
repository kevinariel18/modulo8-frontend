export const API_ROUTES = {
  products: "/products",
  login: "/auth/login",
  register: "/auth/register",
  logout: "/auth/logout",
  refreshToken: "/auth/refresh",
  user: (id: string) => `/users/${id}`,
  upgradePremium: (id: string) => `/users/${id}/premium`,
  catalog: "/api/catalog",
  catalogSearch: "/api/catalog/search",
  favorites: "/api/favorites",
} as const;

export const STORAGE_KEYS = {
  token: "auth_token",
  user: "auth_user",
} as const;

export const MAX_FREE_FAVORITES = 5;
