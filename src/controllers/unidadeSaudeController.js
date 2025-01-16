import { salvarUnidadeSaude, buscarUnidadesPorCriador } from '../services/unidadeSaudeService.js';
import UnidadeSaude from '../models/UnidadeSaude.js';

export const criarUnidadeSaude = async (req, res) => {
  try {
    const { nome, endereco } = req.body;
    const criadoPor = req.user.id; // ID do usuário autenticado

    const unidade = await UnidadeSaude.create({
      nome,
      endereco,
      criadoPor, // Atribuir o ID do usuário aqui
    });

    res.status(201).json(unidade);
  } catch (error) {
    console.error('Erro ao criar unidade de saúde:', error);
    res.status(500).json({ error: 'Erro ao criar unidade de saúde.' });
  }
};



// Função para listar todas as unidades de saúde
export const listarUnidadesSaude = async (req, res) => {
  try {
    const unidades = await UnidadeSaude.find();
    res.status(200).json(unidades);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar unidades de saúde.' });
  }
};