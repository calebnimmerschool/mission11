import { CartItem } from "../types/CartItem";
import { createContext, useContext, ReactNode, useState } from "react";

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
            // Add the item to the cart without modifying CartItem directly
            return [...prevCart, item];
        });
    };

    const removeFromCart = (bookID: number) => {
        setCart((prevCart) => prevCart.filter((c) => c.bookID !== bookID));
    };

    const clearCart = () => {
        setCart(() => []);
    };

    // Dynamically calculate count and price for each book title
    const getCartSummary = () => {
        const summary: Record<string, { count: number; price: number }> = {};

        cart.forEach((item) => {
            // Check if the title already exists in the summary
            if (summary[item.title]) {
                summary[item.title].count += 1;
                summary[item.title].price += item.price;
            } else {
                summary[item.title] = {
                    count: 1,
                    price: item.price,
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
};

export const useCart = () => {
    const context = useContext(cartContext);
    if (!context) {
        throw new Error('CartContext is not available');
    }
    return context;
};
