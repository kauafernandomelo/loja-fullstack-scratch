// Model de produto: define o formato de um produto no banco (quais campos existem e as regras de cada um).
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // required: true = o mongoose recusa salvar um produto sem esse campo
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String, // guarda a URL da imagem, nao o arquivo
      required: true,
    },
  },
  {
    timestamps: true, // cria e atualiza sozinho os campos createdAt e updatedAt
  },
);

// transforma o schema no model que fala com o banco
// "Product" vira a colecao "products" no MongoDB (o mongoose coloca no plural e minusculo)
const Product = mongoose.model("Product", productSchema);

export default Product;
