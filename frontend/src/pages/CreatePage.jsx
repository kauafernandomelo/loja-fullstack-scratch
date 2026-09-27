import { Box, Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toaster } from "../components/ui/toaster.jsx";
import { useProductStore } from "../store/product.js";

const inputBorder = { base: "gray.300", _dark: "gray.600" };

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "" });
  const { createProduct } = useProductStore();
  const navigate = useNavigate(); // serve pra mudar de pagina pelo codigo

  // [e.target.name] usa o name do input como chave, assim 1 funcao serve pros 3 inputs
  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    toaster.create({ title: success ? "Success" : "Error", description: message, type: success ? "success" : "error" });
    if (success) navigate("/"); // deu certo: volta pra HomePage pra ver o produto novo
  };

  return (
    <Container maxW="md" py={12}>
      <VStack gap={8}>
        <Heading as="h1" size="2xl" textAlign="center">
          Create New Product
        </Heading>

        <Box w="full" bg={{ base: "white", _dark: "gray.800" }} p={6} rounded="lg" shadow="md">
          {/* a borda padrao do input tinha a mesma cor do card no modo escuro, por isso uma borda mais clara */}
          <VStack gap={4}>
            <Input placeholder="Product Name" name="name" value={newProduct.name} onChange={handleChange} borderColor={inputBorder} />
            <Input placeholder="Price" name="price" type="number" value={newProduct.price} onChange={handleChange} borderColor={inputBorder} />
            <Input placeholder="Image URL" name="image" value={newProduct.image} onChange={handleChange} borderColor={inputBorder} />
            <Button colorPalette="blue" w="full" onClick={handleAddProduct}>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
