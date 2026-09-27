// Rotas de produto: so liga cada metodo HTTP + URL com a funcao do controller que resolve.
// O prefixo /api/products é colocado no server.js, entao aqui "/" significa /api/products.
import express from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct); // :id vira req.params.id no controller
router.delete("/:id", deleteProduct);

export default router;
