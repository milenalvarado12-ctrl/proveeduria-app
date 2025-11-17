/**
 * Authentication service
 * PB-8: Inicio de Sesión Seguro
 * TODO: Implementar login, JWT y validación de credenciales
 */

// eslint-disable-next-line no-unused-vars
export async function login(_email, _password) {
  // TODO: Validar credenciales contra BD, generar JWT
  // 1. Buscar usuario por email
  // 2. Comparar password hasheado con bcrypt.compare
  // 3. Si válido, generar JWT con jsonwebtoken
  // 4. Retornar token y datos del usuario (sin password)
  throw new Error('Login not implemented yet - PB-8');
}

// eslint-disable-next-line no-unused-vars
export function verifyToken(_token) {
  // TODO: Verificar y decodificar JWT
  // 1. Usar jsonwebtoken.verify con JWT_SECRET
  // 2. Retornar payload decodificado (userId, role, etc.)
  throw new Error('Token verification not implemented yet - PB-8');
}

// eslint-disable-next-line no-unused-vars
export async function comparePassword(_plainPassword, _hashedPassword) {
  // TODO: Comparar password plano con hash usando bcrypt.compare
  // Esto se usará en el login para validar credenciales
  throw new Error('Password comparison not implemented yet - PB-8');
}

