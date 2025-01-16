import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { buscarUsuarioPorEmail } from '../services/usuarioService.js';
import Usuario from '../models/Usuario.js';
import UnidadeSaude from '../models/UnidadeSaude.js';

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
      return res.status(403).json({ error: 'Somente o usuário Master pode criar administradores de unidades.' });
    }

    // Verifica se a unidadeId foi fornecida
    if (!unidadeId) {
      return res.status(400).json({ error: 'unidadeId é necessário para associar o administrador.' });
    }

    // Verifica se a unidadeId existe no banco de dados
    const unidadeExiste = await UnidadeSaude.findById(unidadeId);
    if (!unidadeExiste) {
      return res.status(404).json({ error: 'A unidade fornecida não existe.' });
    }

    // Gera o hash da senha
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    // Criação do administrador para a unidade
    const novoAdministrador = new Usuario({
      nome,
      email,
      senha: senhaHash,
      role: 'Administrador', // Papel do usuário como administrador
      unidadeId, // Atribuição da unidade de saúde
    });

    // Salvar o novo administrador
    await novoAdministrador.save();

    return res.status(201).json(novoAdministrador);
  } catch (err) {
    console.error('Erro ao registrar administrador da unidade:', err);
    return res.status(500).json({ error: 'Erro ao registrar administrador da unidade.' });
  }
};



export const login = async (req, res) => {
  try {
    const { email, senha, unidadeId } = req.body; // Agora esperamos o unidadeId para administradores de unidade

    // Buscar o usuário pelo email
    const usuario = await buscarUsuarioPorEmail(email);
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    // Se o usuário for um administrador de unidade, verifica se o unidadeId corresponde
    if (usuario.role === 'Administrador') {
      // Verifica se o unidadeId foi fornecido e se é válido
      if (!unidadeId || usuario.unidadeId !== unidadeId) {
        return res.status(403).json({ error: 'Você não tem permissão para acessar esta unidade.' });
      }
    }

    // Verificar a senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { id: usuario._id, role: usuario.role, unidadeId: usuario.unidadeId }, // Incluindo unidadeId no payload, se aplicável
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
