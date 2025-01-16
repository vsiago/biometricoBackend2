import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB conectado: ${connect.connection.host}`);
  } catch (erro) {
    console.error(`Erro ao conectar ao MongoDB: ${erro.message}`);
    process.exit(1); // Encerra o processo caso ocorra um erro
  }
};

export default connectDB;
