import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartStore {
  list: ProductInCart[];
  addOne: (product: Product) => void;
  find: (itemId: string) => boolean;
}
export const useCartStore = create(
  persist<CartStore>(
    (set, get) => ({
      list: [],
      addOne: (product) => {
        const { list, find } = get();

        const newList = list.map((item) => {
          if (find(item._id))
            return {
              ...item,
              quantity: item.quantity + 1,
            };

          return {
            ...product,
            quantity: 1,
          };
        });

        set({ list: newList });
      },
      find: (itemId) => {
        const { list } = get();

        return list.some((item) => item._id === itemId);
      },
    }),
    { name: "pizzeria-cart" }
  )
);
