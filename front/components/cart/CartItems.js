import { useCartContext } from "../../context/cartContext";
// import { editCart } from "../../auth";
import { editCart } from "../../http/cart";
import CartItem from "./CartItem";
import { useShopItemsContext } from "../../context/shopItemsContext";
import { useEffect, useRef, useState } from "react";
import { useTotalSumContext } from "../../context/totalSum";

function CartItems() {
    const { cartData, setCartData, userId, coupon } = useCartContext();
    const { shopItems } = useShopItemsContext();
    const [cartItems, setCartItems] = useState(null);
    const { total, setTotal } = useTotalSumContext();
    const priceNodes = useRef([])

    useEffect(() => {
        if (shopItems?.length && cartData?.cartItems?.length) {
            const items = cartData.cartItems.map(item => ({ ...item, shop_item: shopItems.find(shop_item => shop_item.id === item.shop_item) }))
            setCartItems(items);
        }
        }, [cartData, shopItems])
    // }, [shopItems?.length, cartData?.cartItems?.length]);

    useEffect(() => {
        const sum = Array.from(priceNodes.current).filter(Boolean).reduce((a, c) => a + +c.innerText.slice(1), 0)
        const walletIcon = shopItems[0]?.attributes.price[0];
        walletIcon && setTotal(walletIcon + sum)
        }, [cartItems, coupon, setTotal, shopItems]);
    // }, [shopItems?.length, priceNodes.current.length])

    const removeCartItem = async (item) => {
        let cartItems = cartData.cartItems.filter(el => el.shop_item != item.shop_item.id);
        setCartData({ ...cartData, cartItems })
        await editCart(userId, cartData.cartId, cartItems)
    }

    return (
        <div className="col-xl-8 col-lg-9 col-12">
            {cartItems?.length > 0 && cartItems.map((item, i) => {
                return <CartItem item={item} key={item.shop_item.id} removeCartItem={removeCartItem} priceNodes={priceNodes} nodeIdx={i} />
            })}

        </div>
    );
}

export default CartItems;