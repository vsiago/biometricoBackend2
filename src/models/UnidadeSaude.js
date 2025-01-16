import mongoose from 'mongoose';

const UnidadeSaudeSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  endereco: { type: String, required: true },
  criadoPor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }, // Referência ao criador
  criadoEm: { type: Date, default: Date.now },
});

export default mongoose.model('UnidadeSaude', UnidadeSaudeSchema);
