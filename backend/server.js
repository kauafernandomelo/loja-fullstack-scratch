// Ponto de entrada do backend: carrega o .env, monta o app Express, liga as rotas e sobe o servidor.
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

// carrega as variaveis do .env (PORT, MONGO_URI) pra dentro do process.env
// tem que vir antes de qualquer leitura do process.env, senao elas ainda nao existem
dotenv.config();

const PORT = process.env.PORT || 5000; // se o .env nao tiver PORT, usa 5000

const app = express();

app.use(express.json()); // transforma o corpo JSON das requisicoes em objeto no req.body

// todas as rotas do productRoutes ficam com o prefixo /api/products
app.use("/api/products", productRoutes);

app.listen(PORT, (error) => {
  // no Express 5, se o servidor nao conseguir subir (ex: porta ocupada), o erro chega aqui
  // sem esse if, ele imprimia "Server started" mesmo sem estar escutando a porta
  if (error) {
    console.error(`Error starting server: ${error.message}`);
    process.exit(1);
  }

  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});
