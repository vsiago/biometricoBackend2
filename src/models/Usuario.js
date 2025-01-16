import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Garantir que o email seja único
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Por favor insira um e-mail válido'], // Regex para validar o formato do e-mail
  },
  senha: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Master', 'Administrador', 'Funcionario'],
    default: 'Funcionario',
  },
}, { timestamps: true }); // Utilizando timestamps para criação/atualização

const Usuario = mongoose.model('Usuario', userSchema);

export default Usuario;
