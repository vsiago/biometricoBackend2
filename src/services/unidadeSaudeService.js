import UnidadeSaude from '../models/UnidadeSaude.js';

export const salvarUnidadeSaude = async (dados) => {
  const unidade = new UnidadeSaude(dados);
  return await unidade.save();
};

export const buscarUnidadesPorCriador = async (criadorId) => {
  return await UnidadeSaude.find({ criadoPor: criadorId });
};
