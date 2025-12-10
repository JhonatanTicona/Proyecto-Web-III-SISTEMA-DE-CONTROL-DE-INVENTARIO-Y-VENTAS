import bcrypt from 'bcryptjs';

export const encriptarPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const compararPassword = async (password, passwordHash) => {
  return await bcrypt.compare(password, passwordHash);
};

export const validarFortalezaPassword = (password) => {

  const longitud = password.length;
  const tieneMayuscula = /[A-Z]/.test(password);
  const tieneMinuscula = /[a-z]/.test(password);
  const tieneNumero = /[0-9]/.test(password);
  const tieneSimbolo = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  let fortaleza = 'débil';
  let mensaje = '';
  let puntaje = 0;

  if (longitud >= 6) puntaje++;
  if (longitud >= 8) puntaje++;
  if (longitud >= 12) puntaje++;
  if (tieneMayuscula) puntaje++;
  if (tieneMinuscula) puntaje++;
  if (tieneNumero) puntaje++;
  if (tieneSimbolo) puntaje++;

  if (puntaje <= 2) {
    fortaleza = 'débil';
    mensaje = 'La contraseña es muy débil. Debe tener al menos 6 caracteres.';
  } else if (puntaje <= 4) {
    fortaleza = 'intermedio';
    mensaje = 'La contraseña es de nivel intermedio. Considere agregar más caracteres o símbolos.';
  } else {
    fortaleza = 'fuerte';
    mensaje = 'La contraseña es fuerte. ¡Buen trabajo!';
  }

  return {
    fortaleza,
    mensaje,
    puntaje,
    criterios: {
      longitud: longitud >= 8,
      mayuscula: tieneMayuscula,
      minuscula: tieneMinuscula,
      numero: tieneNumero,
      simbolo: tieneSimbolo
    }
  };
};