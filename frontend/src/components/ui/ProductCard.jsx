import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuSquarePen, LuTrash2 } from "react-icons/lu";
import { useProductStore } from "../../store/product.js";
import { toaster } from "./toaster.jsx";

// o card recebe 1 produto por props (a HomePage faz um .map e cria 1 card pra cada produto)
const ProductCard = ({ product }) => {
  const { deleteProduct, updateProduct } = useProductStore();
  const [open, setOpen] = useState(false); // se o dialog (modal) de editar esta aberto
  const [updatedProduct, setUpdatedProduct] = useState(product); // os valores que estao sendo editados

  // [e.target.name] usa o name do input como chave, assim 1 funcao serve pros 3 inputs
  const handleChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
  };

  const handleOpenEdit = () => {
    setUpdatedProduct(product); // comeca a edicao com os valores atuais do produto
    setOpen(true);
  };

  const handleDelete = async () => {
    const { success, message } = await deleteProduct(product._id);
    toaster.create({ title: success ? "Success" : "Error", description: message, type: success ? "success" : "error" });
  };

  const handleUpdate = async () => {
    const { success, message } = await updateProduct(product._id, updatedProduct);
    toaster.create({ title: success ? "Success" : "Error", description: message, type: success ? "success" : "error" });
    if (success) setOpen(false);
  };

  return (
    <Box
      bg={{ base: "white", _dark: "gray.800" }}
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }} // o card sobe um pouco quando passa o mouse
    >
      {/* objectFit cover corta a imagem pra preencher o espaco sem esticar */}
      <Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover" />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight="bold" fontSize="xl" color={{ base: "gray.600", _dark: "gray.200" }} mb={4}>
          ${product.price}
        </Text>
        <HStack gap={2}>
          <IconButton aria-label="Edit product" colorPalette="blue" size="sm" onClick={handleOpenEdit}>
            <LuSquarePen />
          </IconButton>
          <IconButton aria-label="Delete product" colorPalette="red" size="sm" onClick={handleDelete}>
            <LuTrash2 />
          </IconButton>
        </HStack>
      </Box>

      {/* Dialog é o modal que abre por cima da pagina pra editar o produto */}
      <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)} placement="center">
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Update Product</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <VStack gap={4}>
                  <Input placeholder="Product Name" name="name" value={updatedProduct.name} onChange={handleChange} />
                  <Input placeholder="Price" name="price" type="number" value={updatedProduct.price} onChange={handleChange} />
                  <Input placeholder="Image URL" name="image" value={updatedProduct.image} onChange={handleChange} />
                </VStack>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="ghost">Cancel</Button>
                </Dialog.ActionTrigger>
                <Button colorPalette="blue" onClick={handleUpdate}>
                  Update
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
};

export default ProductCard;
