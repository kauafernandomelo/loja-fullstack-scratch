import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ColorModeProvider } from './components/ui/color-mode.jsx'
import { Toaster } from './components/ui/toaster.jsx'

// BrowserRouter liga as rotas, ChakraProvider liga o Chakra (com o tema padrao defaultSystem)
// ColorModeProvider liga o modo claro/escuro (defaultTheme="dark" faz o site abrir no escuro)
// Toaster fica aqui uma vez so pra mostrar as notificacoes em qualquer pagina
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider defaultTheme="dark">
          <App />
          <Toaster />
        </ColorModeProvider>
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>,
)
