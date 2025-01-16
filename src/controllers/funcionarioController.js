import Funcionario from '../models/Funcionario.js';
import UnidadeSaude from '../models/UnidadeSaude.js';

export const criarFuncionario = async (req, res) => {
  try {
    const { nome, email, endereco, biometria, unidadeId } = req.body;

    // Verifique se a unidadeId existe e o usuário está autorizado a criar funcionários nessa unidade
    if (!unidadeId) {
      return res.status(400).json({ error: 'Unidade de saúde não fornecida.' });
    }

    const funcionario = new Funcionario({
      nome,
      email,
      endereco,
      biometria,
      unidadeSaude: unidadeId,
      criadoPor: req.user.id, // ID do administrador
    });

    await funcionario.save();
    return res.status(201).json(funcionario);
  } catch (error) {
    console.error('Erro ao criar funcionário:', error);
    return res.status(500).json({ error: 'Erro ao criar funcionário.' });
  }
};



// Listar todos os funcionários
export const listarFuncionarios = async (req, res) => {
  try {
    const funcionarios = await Funcionario.find();
    res.json(funcionarios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar funcionários.' });
  }
};

// Criar função para buscar funcionários administrativos
export const listarFuncionariosAdministrativos = async (req, res) => {
  try {
    const funcionarios = await Funcionario.find({ role: 'admin' });
    res.json(funcionarios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar funcionários administrativos.' });
  }
};

// Criar função para buscar funcionários por unidade de saúde
export const listarFuncionariosPorUnidade = async (req, res) => {
  const { unidadeId } = req.params;

  try {
    const funcionarios = await Funcionario.find({ unidadeSaude: unidadeId });
    return res.status(200).json(funcionarios);
  } catch (error) {
    console.error('Erro ao listar funcionários:', error);
    return res.status(500).json({ error: 'Erro ao listar funcionários.' });
  }
};