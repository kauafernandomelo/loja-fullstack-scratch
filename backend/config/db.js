// Conexao com o MongoDB. O mongoose nao é o banco: é a biblioteca que o Node usa pra conversar com o MongoDB.
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI); // a MONGO_URI (com usuario e senha) vem do .env
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // encerra o servidor: 1 = saiu com falha, 0 = saiu com sucesso
  }
};
