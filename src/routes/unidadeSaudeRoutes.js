import express from 'express';
import { criarUnidadeSaude, listarUnidadesSaude } from '../controllers/unidadeSaudeController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, criarUnidadeSaude);
router.get('/', authMiddleware, listarUnidadesSaude);

export default router;
