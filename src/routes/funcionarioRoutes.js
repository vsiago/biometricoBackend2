import express from 'express';
import { criarFuncionario, listarFuncionarios, listarFuncionariosAdministrativos, listarFuncionariosPorUnidade } from '../controllers/funcionarioController.js';
import { listarUnidadesSaude } from '../controllers/unidadeSaudeController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { verificarPermissaoAdministrador } from '../middlewares/verificarPermissaoAdministrador.js';

const router = express.Router();

router.post('/:unidadeId', authMiddleware, verificarPermissaoAdministrador, criarFuncionario);


// Rota para listar todos os funcionários (Master)
router.get('/', authMiddleware, listarFuncionarios);

// Rota para listar funcionários administrativos
router.get('/administrativos', authMiddleware, listarFuncionariosAdministrativos);

// Rota para listar funcionários por unidade de saúde
router.get('/unidade/:unidadeId', authMiddleware, listarFuncionariosPorUnidade);

// Rota para listar todas as unidades de saúde
router.get('/unidadesaude', authMiddleware, listarUnidadesSaude);

export default router;
