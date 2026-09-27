// Controllers de produto: cada funcao recebe (req, res), fala com o banco pelo model Product e responde em JSON.
// As rotas que chamam cada funcao ficam em routes/product.route.js.
import mongoose from "mongoose";
import Product from "../models/product.model.js";

// ValidationError = o dado nao passou nas regras do schema (ex: name vazio)
// CastError = o dado veio com o tipo errado (ex: price "abc")
// nos dois casos a culpa é de quem mandou os dados, por isso respondemos 400 e nao 500
const isInvalidDataError = (error) => error.name === "ValidationError" || error.name === "CastError";

// GET /api/products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}); // {} sem filtro = todos os produtos
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error in fetching products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// POST /api/products
export const createProduct = async (req, res) => {
  const product = req.body;

  // checa antes de ir no banco pra devolver uma mensagem clara pro frontend
  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    if (isInvalidDataError(error)) {
      return res.status(400).json({ success: false, message: "Invalid product data" });
    }
    console.error("Error in creating product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// PUT /api/products/:id
// o findByIdAndUpdate so troca os campos que vieram no body, entao na pratica funciona como um PATCH (update parcial)
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  // id com formato invalido faria o mongoose lancar CastError, entao ja responde 404 aqui
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      returnDocument: "after", // devolve o produto ja atualizado (o padrao é devolver como estava antes)
      runValidators: true, // sem isso o mongoose NAO checa as regras do schema no update (daria pra salvar name vazio)
    });

    // findByIdAndUpdate devolve null quando o id nao existe (nao é erro, por isso nao cai no catch)
    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    if (isInvalidDataError(error)) {
      return res.status(400).json({ success: false, message: "Invalid product data" });
    }
    console.error("Error in updating product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  // id com formato invalido faria o mongoose lancar CastError, entao ja responde 404 aqui
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    // findByIdAndDelete devolve null quando o id nao existe (nao é erro, por isso nao cai no catch)
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    // chegar aqui é falha do servidor/banco, nao "produto nao encontrado", por isso 500
    console.error("Error in deleting product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
