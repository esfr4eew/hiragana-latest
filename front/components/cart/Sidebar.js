import { useCartContext } from "../../context/cartContext";
import { useTotalSumContext } from "../../context/totalSum";
import { v4 as uuidv4 } from 'uuid';
// import { newOrder, updateCoupon } from "../../auth";
import { updateCoupon } from "../../http/coupon";
import { newOrder } from "../../http/order"
import { useShopItemsContext } from "../../context/shopItemsContext";
import { useRouter } from 'next/router';
import Image from "next/future/image";
import { useRef } from "react";

function Sidebar() {
    const { total } = useTotalSumContext();
    const { cartData, coupon } = useCartContext();
    const { shopItems } = useShopItemsContext();
    const router = useRouter();
    const country = useRef();
    const city = useRef();
    const zip = useRef();

    const getPrice = (cartItem) => {
        const shopItem = shopItems.find(shopItem => shopItem.id === cartItem.shop_item);
        return shopItem.attributes.price[0] + (cartItem.quantity * +shopItem.attributes.price.slice(1));
    }

    const createOrder = async () => {
        const orderId = uuidv4();
        const data = {
            coupons: coupon?.id, orderId, totalPrice: total, 
            Item: [...cartData.cartItems.map(cartItem => {
                const { id, ...item } = cartItem
                return ({ ...item, price: getPrice(cartItem) })
            })],
            country: country?.current?.value || '',
            city: city?.current?.value || '',
            zip: zip?.current?.value || ''
        }
        await newOrder(data);
        if (coupon) {
            await updateCoupon(coupon);
        }
        router.push(`/checkout/${orderId}`);
    }

    return (
        <div className="col-xl-4 col-lg-3 col-12">
            <div className="cart-total">
                <div className="cart-subtotal" style={{ marginBottom: "15px" }}>
                    <span className="cart-subtotal__title">Subtotal: </span>
                    <span className="cart-subtotal__price">{total}</span>
                </div>

                <div className="cart-total__calculate">Calculate shipping</div>

                <form className="cart-form">
                    {/* <select className="cart-form__select">
                        <option value="UA">Ukraine</option>
                        <option value="USA">Usa</option>
                    </select> */}
                    <input type="text" className="cart-form__input" placeholder="state / country" ref={country} />
                    <input type="text" className="cart-form__input" placeholder="town / city" ref={city} />
                    <input type="text" className="cart-form__input" placeholder="postcode / zip" ref={zip} />
                    {/* <button type="submit" className="cart-form__update">Update</button> */}
                </form>

                <div className="cart-subtotal__title" style={{ marginTop: "25px" }}>Total</div>

                <div className="cart-subtotal__price">{total}</div>

                <a className="cart-total__submit" onClick={async () => await createOrder()}>
                    <Image src="/static/images/basket-icon.png" alt="" width={20} height={20}></Image>

                    <span>proceed to checkout</span></a>
            </div>
        </div>
    );
}

export default Sidebar;