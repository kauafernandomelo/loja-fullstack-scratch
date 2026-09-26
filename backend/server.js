import express, { Router }  from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";





dotenv.config();

const app = express();

app.use(express.json()); // permite a gente aceitar JSON data  no req.body

app.use("/api/products", productRoutes);// aqui vai prefixar sem precisar ter outros routes para chamar os methodos que eu ja tinha cirado antes 


app.listen(5000, () => {
  connectDB();
  console.log("Server started at local host http://localhost:5000");
});
