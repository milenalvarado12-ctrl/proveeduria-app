/**
 * User controller
 * PB-6: Registrar Usuarios y Roles
 */

import * as userRepository from './repository.js';
import { ROLES, isValidRole } from './types.js';

/**
 * Crea un nuevo usuario
 */
export async function createUser(req, res) {
  try {
    const { email, password, role, nombre } = req.body;

    // Validaciones
    if (!email || !password || !role) {
      return res.status(400).json({
        error: 'Email, password y role son requeridos',
      });
    }

    // Validar formato de email básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Email inválido',
      });
    }

    // Validar que el rol sea válido
    if (!isValidRole(role)) {
      return res.status(400).json({
        error: `Rol inválido. Roles permitidos: ${Object.values(ROLES).join(', ')}`,
      });
    }

    // Validar que el email no esté duplicado
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        error: 'El email ya está registrado',
      });
    }

    // Validar longitud mínima de password
    if (password.length < 6) {
      return res.status(400).json({
        error: 'La contraseña debe tener al menos 6 caracteres',
      });
    }

    // Crear usuario
    const newUser = await userRepository.create({
      email,
      password,
      role,
      nombre,
    });

    // Retornar usuario sin password_hash
    // eslint-disable-next-line no-unused-vars
    const { password_hash, ...userWithoutPassword } = newUser;

    return res.status(201).json({
      message: 'Usuario creado exitosamente',
      user: userWithoutPassword,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || 'Error al crear usuario',
    });
  }
}

/**
 * Lista todos los usuarios
 */
export async function listUsers(req, res) {
  try {
    const { role, activo } = req.query;

    const filters = {};
    if (role) filters.role = role;
    if (activo !== undefined) filters.activo = activo === 'true';

    const users = await userRepository.findAll(filters);

    // Remover password_hash de todos los usuarios
    // eslint-disable-next-line no-unused-vars
    const usersWithoutPasswords = users.map(({ password_hash, ...user }) => user);

    return res.status(200).json({
      users: usersWithoutPasswords,
      total: usersWithoutPasswords.length,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || 'Error al listar usuarios',
    });
  }
}

/**
 * Obtiene un usuario por ID
 */
export async function getUserById(req, res) {
  try {
    const { id } = req.params;

    const user = await userRepository.findById(parseInt(id));

    if (!user) {
      return res.status(404).json({
        error: 'Usuario no encontrado',
      });
    }

    // Remover password_hash
    // eslint-disable-next-line no-unused-vars
    const { password_hash, ...userWithoutPassword } = user;

    return res.status(200).json({
      user: userWithoutPassword,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || 'Error al obtener usuario',
    });
  }
}

