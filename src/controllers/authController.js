import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { salvarUsuario, buscarUsuarioPorEmail } from '../services/usuarioService.js';
import Usuario from '../models/Usuario.js';

export const registrarMaster = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
      return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
    }
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    const novoUsuario = new Usuario({
      nome,
      email,
      senha: senhaHash,
      role: 'Master',
    });

    await novoUsuario.save();

    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error('Erro ao registrar usuário master:', error);
    res.status(500).json({ error: 'Erro ao registrar usuário master.' });
  }
};

// Função para registrar o administrador de unidade
export const registrarAdministradorUnidade = async (req, res) => {
  try {
    const { nome, email, senha, unidadeId } = req.body;

    // Verifica se o usuário logado tem permissão de "Master"
    if (req.user.role !== 'Master') {
      return res.status(403).json({ error: 'Somente o usuário master pode criar administradores de unidades.' });
    }

    // Verifica se a unidadeId foi fornecida e é válida
    if (!unidadeId) {
      return res.status(400).json({ error: 'unidadeId é necessário para associar o administrador.' });
    }

    // Criação do administrador para a unidade
    const novoAdministrador = new Usuario({
      nome,
      email,
      senha,
      role: 'Administrador', // Papel do usuário como administrador
      unidadeId, // Atribuição da unidade de saúde
    });

    // Salvar o novo administrador
    await novoAdministrador.save();

    return res.status(201).json(novoAdministrador);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao criar administrador.', details: err.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Buscar o usuário pelo email
    const usuario = await buscarUsuarioPorEmail(email);
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    // Verificar a senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { id: usuario._id, role: usuario.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    res.status(500).json({ error: 'Erro ao realizar login.' });
  }
};

// Listar todos os usuários Master
export const listarUsuariosMaster = async (req, res) => {
  try {
    const usuariosMaster = await Usuario.find({ role: { $regex: /^master$/i } });  // Usando regex para ignorar case
    res.json(usuariosMaster);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuários Master.' });
  }
};
