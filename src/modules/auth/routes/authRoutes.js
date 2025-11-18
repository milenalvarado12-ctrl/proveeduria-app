/**
 * Authentication routes
 * PB-8: Inicio de Sesión Seguro
 */

import express from 'express';
import { login } from '../service.js';
import * as usersData from '../../users/usersData.js';
import * as userRepository from '../../users/repository.js';
import { ROLES } from '../../users/types.js';

const router = express.Router();

/**
 * POST /auth/login
 * Inicia sesión con email y password
 * Body: { email: string, password: string }
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar que se proporcionen email y password
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email y password son requeridos' 
      });
    }

    // Intentar login
    const result = await login(email, password);

    return res.status(200).json({
      message: 'Login exitoso',
      ...result,
    });
  } catch (error) {
    return res.status(401).json({ 
      error: error.message || 'Error al iniciar sesión' 
    });
  }
});

/**
 * POST /auth/init - Inicializa usuario admin si no existe (solo desarrollo)
 */
router.post('/init', async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ error: 'Not available in production' });
  }

  try {
    const existingAdmin = await userRepository.findByEmail('admin@proveeduria.com');
    
    if (existingAdmin) {
      return res.json({ 
        message: 'Usuario admin ya existe',
        email: existingAdmin.email 
      });
    }

    const admin = await userRepository.create({
      email: 'admin@proveeduria.com',
      password: 'admin123',
      role: ROLES.ADMIN,
      nombre: 'Administrador',
    });

    // eslint-disable-next-line no-unused-vars
    const { password_hash, ...adminSafe } = admin;

    return res.status(201).json({
      message: 'Usuario admin creado exitosamente',
      user: adminSafe,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * GET /auth/debug/users - Endpoint temporal de debug
 * Muestra todos los usuarios en memoria (solo desarrollo)
 */
router.get('/debug/users', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ error: 'Not available in production' });
  }
  
  const users = usersData.getAllUsers();
  const usersSafe = users.map(({ password_hash, ...user }) => ({
    ...user,
    hasPasswordHash: !!password_hash,
  }));
  
  return res.json({ users: usersSafe, total: usersSafe.length });
});

export default router;

