import { create } from "zustand";

// a store do zustand é tipo um useState global: qualquer pagina pode ler os products e chamar as funcoes
// assim quando a CreatePage cria um produto, a HomePage ja ve ele na lista sem precisar passar props
// res.ok é true quando o status da resposta é 2xx (200, 201...) e false quando é erro (400, 404, 500...)

export const useProductStore = create((set) => ({
  products: [],

  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (res.ok) set({ products: data.data });
    } catch (error) {
      console.error("error in fetching products:", error.message);
    }
  },

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill in all fields." };
    }
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // avisa o backend que estamos mandando JSON
        body: JSON.stringify(newProduct), // transforma o objeto em texto JSON
      });
      const data = await res.json();
      if (!res.ok) return { success: false, message: data.message };
      // ...state.products copia a lista antiga e coloca o produto novo no final
      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: "Product created successfully." };
    } catch (error) {
      console.error(error.message);
      return { success: false, message: "Could not reach the server." };
    }
  },

  deleteProduct: async (id) => {
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) return { success: false, message: data.message };
      // filter deixa na lista so os produtos com id diferente do que foi apagado
      set((state) => ({ products: state.products.filter((product) => product._id !== id) }));
      return { success: true, message: data.message };
    } catch (error) {
      console.error(error.message);
      return { success: false, message: "Could not reach the server." };
    }
  },

  updateProduct: async (id, updatedProduct) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, message: data.message };
      // map troca so o produto que foi atualizado e mantem os outros iguais
      set((state) => ({
        products: state.products.map((product) => (product._id === id ? data.data : product)),
      }));
      return { success: true, message: "Product updated successfully." };
    } catch (error) {
      console.error(error.message);
      return { success: false, message: "Could not reach the server." };
    }
  },
}));
