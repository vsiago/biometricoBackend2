import Usuario from '../models/Usuario.js';

export const salvarUsuario = async (dados) => {
  const usuario = new Usuario(dados);
  return await usuario.save();
};

export const buscarUsuarioPorEmail = async (email) => {
  return await Usuario.findOne({ email });
};
