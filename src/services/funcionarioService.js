import Funcionario from '../models/Funcionario.js';

export const salvarFuncionario = async (dados) => {
  const funcionario = new Funcionario(dados);
  return await funcionario.save();
};

export const buscarFuncionariosPorUnidade = async (unidadeId) => {
  return await Funcionario.find({ unidadeSaude: unidadeId });
};
