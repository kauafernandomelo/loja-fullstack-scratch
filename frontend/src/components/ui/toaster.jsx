import { Toaster as ChakraToaster, Portal, Stack, Toast, createToaster } from "@chakra-ui/react";

// toaster é aquela notificacao que aparece no canto da tela ("Product created" etc)
// em qualquer arquivo a gente chama toaster.create({ title, description, type: "success" | "error" })
export const toaster = createToaster({
  placement: "bottom-end",
  pauseOnPageIdle: true,
});

// esse componente tem que estar na tela uma vez so (coloquei no main.jsx) pra mostrar os toasts
export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: "4" }}>
        {(toast) => (
          <Toast.Root width={{ md: "sm" }}>
            <Toast.Indicator />
            <Stack gap="1" flex="1" maxWidth="100%">
              {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
              {toast.description && <Toast.Description>{toast.description}</Toast.Description>}
            </Stack>
            <Toast.CloseTrigger />
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  );
};
