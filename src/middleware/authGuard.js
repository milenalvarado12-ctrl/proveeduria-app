/**
 * Authentication guard middleware
 * PB-8: Inicio de Sesión Seguro
 * Protege rutas requiriendo JWT válido y opcionalmente roles específicos
 */

// eslint-disable-next-line no-unused-vars
export function authGuard(_requiredRoles = []) {
  return async (_req, _res, next) => {
    // TODO: Implementar validación de JWT y roles
    // 1. Extraer token de header Authorization: Bearer <token>
    // 2. Verificar token con authService.verifyToken()
    // 3. Si requiredRoles no está vacío, validar que el usuario tenga uno de esos roles
    // 4. Adjuntar datos del usuario a req.user
    // 5. Si no válido, retornar 401 o 403
    
    // Placeholder: por ahora permite pasar
    next();
  };
}

