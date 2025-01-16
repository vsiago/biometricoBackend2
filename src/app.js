import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import unidadeSaudeRoutes from './routes/unidadeSaudeRoutes.js';
import funcionarioRoutes from './routes/funcionarioRoutes.js';

// Carregar variáveis de ambiente
dotenv.config();

// Conectar ao banco de dados
connectDB();

const app = express();

// Middlewares globais
app.use(express.json()); // Parse JSON
app.use(cors()); // Habilitar CORS
app.use(morgan('dev')); // Log de requisições em modo desenvolvimento

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/unidadesaude', unidadeSaudeRoutes);
app.use('/api/funcionarios', funcionarioRoutes);


// Rota principal
app.get('/', (req, res) => {
  res.send('API do Sistema Biométrico para Rede de Saúde está funcionando.');
});

// Middleware de erro para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada.' });
});

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running ${PORT}`))

export default app;
