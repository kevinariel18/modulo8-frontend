/**
 * Contenedor de dependencias — punto único de configuración de infraestructura.
 * Si cambia la URL base, el puerto, o cualquier adaptador, solo se toca este archivo.
 */
import { env } from "@/config/env";
import { HttpClient } from "@/infrastructure/api/httpClient";
import { ApiAuthRepository } from "@/infrastructure/adapters/ApiAuthRepository";
import { ApiCatalogRepository } from "@/infrastructure/adapters/ApiCatalogRepository";
import { ApiFavoritesRepository } from "@/infrastructure/adapters/ApiFavoritesRepository";
import { ApiUserRepository } from "@/infrastructure/adapters/ApiUserRepository";

// Un único HttpClient compartido — mantiene el token sincronizado entre repositorios
export const httpClient = new HttpClient(env.apiBaseUrl);

// Repositorios — singletons que usan el mismo httpClient
export const authRepository = new ApiAuthRepository(httpClient);
export const catalogRepository = new ApiCatalogRepository(httpClient);
export const favoritesRepository = new ApiFavoritesRepository(httpClient);
export const userRepository = new ApiUserRepository(httpClient);
