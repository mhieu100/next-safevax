import { ICartItem, IVaccine } from "@/types/backend";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  items: ICartItem[];
  addItem: (vaccine: IVaccine, quantity: number) => void;
  removeItem: (id: number | string) => void;
  increase: (id: number | string) => void;
  decrease: (id: number | string) => void;
  clearCart: () => void;
  totalQuantity: () => number;
  totalPrice: () => number;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (vaccine, quantity) => {
        const items = get().items;
        const exist = items.find((i) => i.vaccine.id === vaccine.id);

        if (exist) {
          // nếu đã tồn tại thì cộng thêm số lượng mong muốn
          set({
            items: items.map((i) =>
              i.vaccine.id === vaccine.id
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
          });
        } else {
          // thêm mới với số lượng mong muốn
          set({ items: [...items, { vaccine, quantity }] });
        }
      },

      removeItem: (id) =>
        set({
          items: get().items.filter((i) => i.vaccine.id !== id),
        }),

      increase: (id) => {
        const items = get().items;

        set({
          items: items.map((i) =>
            i.vaccine.id === id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        });
      },

      decrease: (id) => {
        const items = get().items;
        const target = items.find((i) => i.vaccine.id === id);
        if (!target) return;

        if (target.quantity === 1) {
          set({
            items: items.filter((i) => i.vaccine.id !== id),
          });
        } else {
          set({
            items: items.map((i) =>
              i.vaccine.id === id ? { ...i, quantity: i.quantity - 1 } : i
            ),
          });
        }
      },

      clearCart: () => set({ items: [] }),

      totalQuantity: () =>
        get().items.reduce((acc, item) => acc + item.quantity, 0),

      totalPrice: () =>
        get().items.reduce(
          (acc, item) => acc + item.vaccine.price * item.quantity,
          0
        ),
    }),
    {
      name: "cart-storage", // key lưu trong localStorage
    }
  )
);

export default useCartStore;
