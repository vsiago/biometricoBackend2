import mongoose from 'mongoose';

const funcionarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  endereco: {
    type: String,
    required: true,
  },
  biometria: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['funcionario', 'Administrador'], // Define os papéis permitidos
    default: 'funcionario', // Valor padrão
  },
  unidadeSaude: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UnidadeSaude',
    required: true,
  },
}, { timestamps: true });

const Funcionario = mongoose.model('Funcionario', funcionarioSchema);

export default Funcionario;
