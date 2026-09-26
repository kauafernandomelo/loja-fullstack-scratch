import mongoose from "mongoose";
//schema é aonde a gente define as regras  de como deve funcionar a aplicaçao

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,     //esse é o codigo padrao para criar  o schema de oque o prodcut deve ter  deve ter nome preço e imagen e o time  e required true é para obrigar a ter isso ou vai dar error
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // createdat e updated at  cria o dia de criaçao e updated at 
  },
);

const Product = mongoose.model("Product", productSchema); // transforma a regra (schema) numa ferramenta que fala com o banco; salva na coleção "products" e é usado pra criar, buscar, atualizar e apagar

export default Product;
