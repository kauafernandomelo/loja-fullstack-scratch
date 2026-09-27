import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import CreatePage from './pages/CreatePage.jsx'
import HomePage from './pages/HomePage.jsx'
import Navbar from './components/ui/Navbar.jsx'

function App() {
  return (
    // base é a cor no modo claro e _dark é a cor no modo escuro
    <Box minH={"100vh"} bg={{ base: "gray.100", _dark: "gray.900" }}>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
}

export default App;
