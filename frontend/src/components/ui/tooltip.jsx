import { Tooltip as ChakraTooltip, Portal } from "@chakra-ui/react";

// tooltip é a caixinha com uma descricao que aparece quando passa o mouse em cima (tipo o title/abbr do HTML)
// no Chakra v3 ele é montado em partes (Root, Trigger, Content...), entao esse componente junta tudo
// pra usar é so envolver o elemento: <Tooltip content="texto">{botao}</Tooltip>
export const Tooltip = ({ content, children, ...rest }) => {
  return (
    // openDelay é quanto tempo (ms) o mouse precisa ficar em cima antes de aparecer
    <ChakraTooltip.Root openDelay={200} {...rest}>
      {/* asChild faz o Trigger usar o proprio filho (o botao) em vez de criar outro elemento */}
      <ChakraTooltip.Trigger asChild>{children}</ChakraTooltip.Trigger>
      {/* Portal renderiza a caixinha no final do <body>, assim ela fica por cima de tudo */}
      <Portal>
        <ChakraTooltip.Positioner>
          <ChakraTooltip.Content>
            <ChakraTooltip.Arrow>
              <ChakraTooltip.ArrowTip />
            </ChakraTooltip.Arrow>
            {content}
          </ChakraTooltip.Content>
        </ChakraTooltip.Positioner>
      </Portal>
    </ChakraTooltip.Root>
  );
};
