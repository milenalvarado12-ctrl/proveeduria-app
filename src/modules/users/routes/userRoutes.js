/**
 * User routes
 * PB-6: Registrar Usuarios y Roles
 */

import express from 'express';
import { createUser, listUsers, getUserById } from '../controller.js';
import { authGuard } from '../../../middleware/authGuard.js';
import { ROLES } from '../types.js';

const router = express.Router();

// En desarrollo, permitir crear usuarios sin autenticación (para inicializar el primer admin)
// En producción, todas las rutas requieren autenticación y rol de Administrador
const isDevelopment = process.env.NODE_ENV !== 'production';

if (!isDevelopment) {
  // En producción, todas las rutas requieren autenticación admin
  router.use(authGuard([ROLES.ADMIN]));
}

// POST /users - Crear nuevo usuario
// En desarrollo: sin autenticación | En producción: requiere admin
router.post('/', createUser);

// GET /users - Listar usuarios (con filtros opcionales: ?role=Comprador&activo=true)
// Siempre requiere autenticación admin
router.get('/', authGuard([ROLES.ADMIN]), listUsers);

// GET /users/:id - Obtener usuario por ID
// Siempre requiere autenticación admin
router.get('/:id', authGuard([ROLES.ADMIN]), getUserById);

export default router;

