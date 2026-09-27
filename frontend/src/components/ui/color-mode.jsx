import { ThemeProvider, useTheme } from "next-themes";

// no Chakra v3 nao existe mais o useColorMode pronto, quem cuida do modo claro/escuro é o next-themes
// o ColorModeProvider coloca a classe "dark" ou "light" no <html> e o Chakra troca as cores sozinho
// o next-themes coloca uma <script> na pagina que so serve em sites com servidor (Next.js)
// no Vite ela nunca roda e o React avisa no console, entao marcamos ela como dados (application/json) pra ele parar de avisar
export function ColorModeProvider(props) {
  return (
    <ThemeProvider
      attribute="class"
      disableTransitionOnChange
      scriptProps={{ type: "application/json" }}
      {...props}
    />
  );
}

// hook pra usar nos componentes: colorMode diz o modo atual e toggleColorMode troca
export function useColorMode() {
  const { resolvedTheme, setTheme } = useTheme();
  const toggleColorMode = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };
  return { colorMode: resolvedTheme, toggleColorMode };
}
