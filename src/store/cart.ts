import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartStore {
  list: ProductInCart[];
  addOne: (product: Product) => void;
  find: (itemId: string) => boolean;
  getCartCount: () => number;
  getTotal: () => string;
  deleteOne: (itemId: string) => void;
}
export const useCartStore = create(
  persist<CartStore>(
    (set, get) => ({
      list: [],
      addOne: (product) => {
        const { list, find } = get();
        const isInCart = find(product._id);
        if (!isInCart) {
          const newList = [...list, { ...product, quantity: 1 }];

          set({ list: newList });

          return;
        }

        const updatedList = list.map((item) => {
          if (item._id === product._id)
            return {
              ...item,
              quantity: item.quantity + 1,
            };

          return item;
        });

        set({ list: updatedList });
      },
      deleteOne: (itemId) => {
        const { list } = get();

        const filteredList = list.filter((item) => item._id !== itemId);

        set({ list: filteredList });
      },
      find: (itemId) => {
        const { list } = get();

        return list.some((item) => item._id === itemId);
      },
      getCartCount: () => get().list.length,
      getTotal: () =>
        get()
          .list.reduce((acc, value) => acc + value.quantity * value.price, 0)
          .toLocaleString("es-ar", { currency: "ARS" }),
    }),
    { name: "pizzeria-cart" }
  )
);
