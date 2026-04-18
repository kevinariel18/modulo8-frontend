import type { HttpError } from "./httpClient";

export function handleApiError(error: unknown): string {
  if (!error) {
    return "Error desconocido";
  }

  // Error HTTP con status
  if (typeof error === "object" && "status" in error) {
    const httpError = error as HttpError;
    
    switch (httpError.status) {
      case 400:
        return "Datos inválidos. Por favor verifica la información.";
      case 401:
        return "Sesión expirada. Por favor inicia sesión nuevamente.";
      case 403:
        return "No tienes permisos para realizar esta acción.";
      case 404:
        return "Recurso no encontrado.";
      case 409:
        return "Este email ya está registrado.";
      case 422:
        return "Los datos proporcionados no son válidos.";
      case 429:
        return "Demasiadas solicitudes. Intenta más tarde.";
      case 500:
        return "Error del servidor. Intenta más tarde.";
      case 503:
        return "Servicio no disponible. Intenta más tarde.";
      default:
        return `Error ${httpError.status}: ${httpError.message}`;
    }
  }

  // Error estándar
  if (error instanceof Error) {
    return error.message;
  }

  return "Ha ocurrido un error inesperado";
}

export function isAuthError(error: unknown): boolean {
  if (typeof error === "object" && error && "status" in error) {
    const httpError = error as HttpError;
    return httpError.status === 401 || httpError.status === 403;
  }
  return false;
}
