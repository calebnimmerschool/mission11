import { CartItem } from "../types/CartItem"
import { createContext, useContext, ReactNode, useState } from "react"

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (bookID: number) => void;
    clearCart: () => void;
    getCartSummary: () => Record<string, { count: number; price: number }>;
}

const cartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({children}: {children: ReactNode}) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((c) => c.bookID === item.bookID);
            const updatedCart = prevCart.map((c) =>
                c.bookID === item.bookID ? {...c, cartPrice: c.price + item.price} : c
            );

            return existingItem ? updatedCart : [...prevCart, item];
        });
    };

    const removeFromCart = (bookID: number) => {
        setCart((prevCart) => prevCart.filter((c) => c.bookID !== bookID));
    };

    const clearCart = () => {
        setCart(() => []);
    };

    const getCartSummary = () => {
        const summary: Record<string, { count: number; price: number }> = {};
        cart.forEach((item) => {
          if (summary[item.title]) {
            summary[item.title].count += 1;
          } else {
            summary[item.title] = {
              count: 1,
              price: item.price, // assuming each book has the same price
            };
          }
        });
        return summary;
      };

    return (
        <cartContext.Provider value={{cart, addToCart, removeFromCart, clearCart, getCartSummary}}>
            {children}
        </cartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(cartContext);
    if (!context) {
        throw new Error('blah');
    }
    return context;
};