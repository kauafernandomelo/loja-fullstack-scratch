import Product from "../models/product.model";

export const getProducts =  async (req, res) => {

  try {
    const products = await Product.find({}); // cria a variavel produtos e usa o await pra procurar no banco de dados
    // product.find e vazio é pra pegar tudo que ta dentro
    res.status(200).json({ sucess: true, data: products }); // padrao aqui com o response 200 que deu certo sucess e a data: produtos
    // justamente para retornar os produtos que estao  em produtos
  } catch (error) {
    console.log("error in fetching products:", error.message); // se nao conseguir pegar os produtos da esse error esse do console é so pra ajudar a gente a debugar mais facil
    res.status(500).json({ sucess: false, message: "Server Error" }); // e agora sim vai respodner na API o error
  }
};

export const createProducts =  async (req, res) => {
  const product = req.body; //usuario vai enviar esse dado

  if (!product.name || !product.price || !product.image) {
    // !product.name o ! siginifica se nao estiver product.name e o || serve pra dizer ou  e se tambem tipo and e or
    return res // res é response / req é request
      .status(400)
      .json({ sucess: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ sucess: true, data: newProduct });
  } catch (error) {
    console.error("Error in Create product:", error.message);
    (res.status(500), json({ sucess: false, message: "Server Error" }));
  }
};

export const deleteProduct =  async (req, res) => {
  // o id: é para selicionar por ID  pra poder deletar por id ou update

  const { id } = req.params; //o const {id} é oque foi pedido aqui no id se for pedido hello tem que ser hello no const mas como estamos procurando por id vai ser id e  O req.params captura o que foi digitado no lugar do :id
  console.log("id:", id); // e aqui é obviu printando  o nome id e o id em si
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ sucess: true, message: "Product deleted" }); // O "await" avisa: "Espere o MongoDB achar o produto antes de ir para a linha de baixo"
  } catch (error) {
    console.log("error in deleting product:", error.message);
    res.status(404).json({ sucess: false, message: "Product not found" }); // e res é responda.status é responda com o status ai o error tem q saber 200 é sucesso e 404 not found por exemplo mas tem outros
  }
};


export const updateProduct = //basicamente estou criando a rota patch atualiza parcial e put atualiza por completo que é update criando a const id e dando ela o req.params e no try catch no try eu falo await product.findbyidandupdate(id) falo pro db ache no banco de dados os produtos por id e update ele e o response se for achado sucess = true a mensagenzinha  e no catch error que smpre é error res 404 sucess false q é error e a mensagenzinha
  async (req, res)  => {
    const { id } = req.params;
    const product = req.body; // esqueci de pegar oque o usuario quer fazer update com o req.body xd 
    console.log("id:", id);
    try {
      const updateProduct = await Product.findByIdAndUpdate(id, product, {new:true}); // para fazer o update do produto consultado por id temos que criar a const updateproduct  = e vai ser await para buscar no DB e Product que é odb .findbyidandupdate o id e produto e o new:true é 1 comando do mongoose para dizer que  apos atualizar o um documento ele deve devolver ja modificado
      res.status(200).json({ sucess: true, data: updateProduct });// padrao denovo que foi criado com  sucesso e o updateproduct que é a viarvel do produto ja updated 
    } catch (error) {
      console.log("error in updating product", error.message);// os erros se der algo de errado
      res.status(404).json({ sucess: false, message: "Product not found" });// se nao tiver no banco de dados  o id procurado
    }
  };