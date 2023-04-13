import { createContext, useContext, useEffect, useState } from "react";
// import { auth, initCartData } from "../auth";
import { initCartData } from "../http/cart";

const CartContext = createContext();

export const CartContextWrapper = ({ children }) => {
    const [cartData, setCartData] = useState(null);
    const [userId, setUserId] = useState(null);
    const [coupon, setCoupon] = useState(false)

    useEffect(() => {
        async function getCartItems() {
            const { userId, cartData } = await initCartData();
            setUserId(userId);
            setCartData(cartData);
        }
        getCartItems();
    }, [])

    return (
        <CartContext.Provider value={{ cartData, setCartData, userId, coupon, setCoupon }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => useContext(CartContext);