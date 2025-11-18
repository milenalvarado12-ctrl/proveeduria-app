/**
 * User repository
 * PB-6: Registrar Usuarios y Roles
 * Usa datos dummy en memoria (temporal hasta que PB-20 complete conexión BD)
 */

import bcrypt from 'bcryptjs';
import * as usersData from './usersData.js';

/**
 * Busca un usuario por email
 */
export async function findByEmail(email) {
  return usersData.findUserByEmail(email);
}

/**
 * Crea un nuevo usuario con password hasheado
 * @param {object} userData - { email, password, role, nombre? }
 */
export async function create(userData) {
  const { email, password, role, nombre } = userData;

  // Hash de la contraseña
  const password_hash = await bcrypt.hash(password, 10);

  const newUser = usersData.addUser({
    email,
    password_hash,
    role,
    nombre: nombre || email.split('@')[0], // Default nombre desde email
    activo: true,
  });

  return newUser;
}

/**
 * Busca un usuario por ID
 */
export async function findById(id) {
  return usersData.findUserById(id);
}

/**
 * Lista todos los usuarios con filtros opcionales
 */
export async function findAll(filters = {}) {
  let users = usersData.getAllUsers();

  // Filtrar por rol si se especifica
  if (filters.role) {
    users = users.filter(u => u.role === filters.role);
  }

  // Filtrar por estado activo/inactivo
  if (filters.activo !== undefined) {
    users = users.filter(u => u.activo === filters.activo);
  }

  return users;
}

/**
 * Actualiza un usuario existente
 */
export async function update(id, updates) {
  // Si se actualiza la contraseña, hashearla
  if (updates.password) {
    updates.password_hash = await bcrypt.hash(updates.password, 10);
    delete updates.password;
  }

  return usersData.updateUser(id, updates);
}