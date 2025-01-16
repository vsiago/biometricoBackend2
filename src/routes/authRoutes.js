import express from 'express';
import { registrarMaster, login, listarUsuariosMaster } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { registrarAdministradorUnidade } from '../controllers/authController.js';

const router = express.Router();

router.post('/registrar-master', registrarMaster);
router.post('/login', login);
router.get('/usuarios-master', authMiddleware, listarUsuariosMaster);
router.post('/registrar-administrador-unidade', authMiddleware, registrarAdministradorUnidade);



export default router;
