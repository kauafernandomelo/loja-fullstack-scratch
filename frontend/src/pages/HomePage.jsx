import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ui/ProductCard.jsx";
import { useProductStore } from "../store/product.js";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  // useEffect roda quando a pagina abre: aqui ele busca os produtos no backend
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW="1140px" py={12}>
      <VStack gap={8}>
        <Text
          fontSize="30px"
          fontWeight="bold"
          textAlign="center"
          bgGradient="to-r"
          gradientFrom="cyan.400"
          gradientTo="blue.500"
          bgClip="text"
        >
          Current Products 🚀
        </Text>

        {/* SimpleGrid monta a grade: 1 coluna no celular, 2 no md e 3 no lg */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={10} w="full">
          {products.map((product) => (
            // key ajuda o React a saber qual card é qual quando a lista muda
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {/* && so mostra essa mensagem se a lista estiver vazia */}
        {products.length === 0 && (
          <Text fontSize="xl" textAlign="center" fontWeight="bold" color="gray.500">
            No products found 😢{" "}
            <Link to="/create">
              <Text as="span" color="blue.500" _hover={{ textDecoration: "underline" }}>
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
