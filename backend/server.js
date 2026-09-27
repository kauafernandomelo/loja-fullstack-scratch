import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
// o server é  tipo  o main aqui a gente coloca a dontenv conifig q é a nossa senha de acesso ao banco de dados 
// temos que validar o epxress com o app  = express ()
// e o app.use.epress.json permite que a gente aceita json data no req.body
// o app.use("/api/products", productRoutes)// vai fixar todos os rotuers para ir para api products invez de ser api/prodcts/udpate / delet etc 


// o PORT que esta dentro do .env é a porta que a aplicaçao funcionara é 1 boa pratica  colocar la a porta
// e aqui em baixo chamala  no console log mas basicamente é so 1 boa pratica da no msm so escrever la ou mudar aqui msmo no const port e trocar dps do || 


const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();

app.use(express.json()); // permite a gente aceitar JSON data  no req.body

app.use("/api/products", productRoutes);// aqui vai prefixar sem precisar ter outros routes para chamar os methodos que eu ja tinha cirado antes 


app.listen(PORT, () => {
  connectDB();
  console.log("Server started at local host http://localhost:" + PORT);
});
