import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { LuMoon, LuSquarePlus, LuSun } from "react-icons/lu";
import { useColorMode } from "./color-mode.jsx";
import { Tooltip } from "./tooltip.jsx";

// o Link do react-router-dom troca de pagina sem recarregar o site (diferente do <a href>)
// os icones vem do react-icons, o "lu" é o pacote de icones Lucide

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW="1140px" px={4}>
      {/* no celular (base) a logo fica em cima dos botoes, a partir do sm fica tudo na mesma linha */}
      <Flex
        minH={16}
        py={{ base: 3, sm: 0 }}
        gap={2}
        alignItems="center"
        justifyContent="space-between"
        flexDir={{ base: "column", sm: "row" }}
      >
        {/* bgGradient + bgClip="text" pinta o texto com um degrade */}
        <Text
          fontSize={{ base: "22px", sm: "28px" }}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          bgGradient="to-r"
          gradientFrom="cyan.400"
          gradientTo="blue.500"
          bgClip="text"
        >
          {/* clicar no nome volta pra HomePage */}
          <Link to="/">Product Store 🛒</Link>
        </Text>

        {/* bg com base/_dark da um cinza que aparece nos dois temas (o subtle padrao ficava da mesma cor da pagina) */}
        <HStack gap={2}>
          {/* o Tooltip mostra a descricao quando passa o mouse em cima do botao */}
          <Tooltip content="Create a new product">
            {/* asChild faz o Button usar o Link como elemento: tem cara de botao mas navega pra /create */}
            <Button asChild variant="subtle" size="sm" aria-label="Create product" bg={{ base: "gray.200", _dark: "gray.700" }} _hover={{ bg: { base: "gray.300", _dark: "gray.600" } }}>
              <Link to="/create">
                <LuSquarePlus />
              </Link>
            </Button>
          </Tooltip>
          {/* a descricao muda conforme o modo atual, igual o icone */}
          <Tooltip content={colorMode === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
            {/* no modo escuro mostra o sol (pra ir pro claro) e no claro mostra a lua */}
            <Button onClick={toggleColorMode} variant="subtle" size="sm" aria-label="Toggle color mode" bg={{ base: "gray.200", _dark: "gray.700" }} _hover={{ bg: { base: "gray.300", _dark: "gray.600" } }}>
              {colorMode === "dark" ? <LuSun /> : <LuMoon />}
            </Button>
          </Tooltip>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
