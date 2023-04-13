import { useEffect, useState } from "react";
import { useCartContext } from "../../context/cartContext"
// import { editCart } from "../../auth";
import { editCart } from "../../http/cart";
import { useRouter } from 'next/router';
import Image from "next/future/image";

function Item({ id, product }) {
    const { userId, cartData, setCartData } = useCartContext();
    const [topImageIndex, setTopImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState(null);
    const [itemInCart, setItemInCart] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (cartData) {
            setItemInCart(cartData.cartItems.find(item => item.shop_item == product.id))
        }
    }, [id, cartData, product.id])

    useEffect(() => {

        const beforeLeavePage = async () => {
            if (itemInCart) {
                const item = { size: size || product.attributes.sizes[0].sizeShirt, quantity, shop_item: product.id };
                let cartItems = cartData.cartItems.filter(item => item.shop_item != product.id).concat(item)
                setCartData({ ...cartData, cartItems })
                await editCart(userId, cartData.cartId, cartItems)
            }
        }
        router.events.on('routeChangeStart', beforeLeavePage);

        return () => {
            router.events.off('routeChangeStart', beforeLeavePage);
        };
    }, [itemInCart, quantity, size, router.events, cartData, product.attributes.sizes, product.id, setCartData, userId]);

    const incrementQuantity = () => setQuantity(++quantity);

    const decrementQuantity = () => {
        if (quantity === 1) return;
        setQuantity(--quantity);
    }

    const changeSize = (e) => {
        setSize(e.target.value)
    }


    const toggleCartItem = async () => {
        let cartItems;
        if (itemInCart) {
            cartItems = cartData.cartItems.filter(item => item.shop_item != product.id)
            setItemInCart(false);
        } else {
            const item = { size: size || product.attributes.sizes[0].sizeShirt, quantity, shop_item: product.id };
            cartItems = cartData.cartItems.concat(item);
        }
        setCartData({ ...cartData, cartItems })
        await editCart(userId, cartData.cartId, cartItems)
    }

    const buyItNow = async () => {
        let cartItems
        const item = { size: size || product.attributes.sizes[0].sizeShirt, quantity, shop_item: product.id };
        cartItems = cartData.cartItems.filter(item => item.shop_item != product.id).concat(item);
        setCartData({ ...cartData, cartItems })
        await editCart(userId, cartData.cartId, cartItems)
        router.push('/cart');
    }


    return (
        <div>
            {product && <div className="good">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-5 offset-sm-1 col-12 offset-0 good-preview">
                            <div className="good-preview-container">
                                <Image src={process.env.NEXT_PUBLIC_API_HOST + product.attributes.imageList.data[topImageIndex].attributes.url} alt="osaka jdm" className="good__image" width={product.attributes.imageList.data[topImageIndex].attributes.width} height={product.attributes.imageList.data[topImageIndex].attributes.height}></Image>

                            </div>
                            <div className="thumbnails">
                                {product.attributes.imageList.data.map((imageData, i) => {
                                    return (
                                        <button className={`thumbnails__button ${topImageIndex === i ? "thumbnails__button--active" : ""} `} key={imageData.id} onClick={() => setTopImageIndex(i)}>
                                            <Image src={process.env.NEXT_PUBLIC_API_HOST + imageData.attributes.url} alt="osaka jdm thumbnail" className="thumbnails__image" width={50} height={50}></Image>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="col-sm-5 col-12 good-info">
                            <div className="good__name">{product.attributes.name}</div>
                            <div className="good__price">{product.attributes.price}</div>
                            <form className="good-form" onSubmit={(e) => e.preventDefault()}>
                                <fieldset className="good-form__group">
                                    <label className="good-form__label">
                                        <div className="good-form__param">size</div>
                                        <select className="good-form__select" onChange={changeSize}>
                                            {product.attributes.sizes.map(size => {
                                                return (
                                                    <option key={size.id} value={size.sizeShirt} className="good-form__option">{size.sizeShirt}</option>
                                                )
                                            })}
                                        </select>
                                    </label>
                                    <label className="good-form__label">
                                        <div className="good-form__param">quantity</div>
                                        <div className="good-form__quantity-group">
                                            <button type="button" className="good-form__quantity-action good-form__subtraction" onClick={decrementQuantity}>-</button>
                                            <span className="good-form__quantity">{quantity}</span>
                                            <button type="button" className="good-form__quantity-action good-form__addition" onClick={incrementQuantity}>+</button>
                                        </div>
                                    </label>
                                </fieldset>
                                <div className="good-form__buttons">
                                    <a className="good-form__button good-form__buy" onClick={async () => { await buyItNow() }}>Buy it now</a>
                                    <button className={`good-form__button good-form__add ${itemInCart ? "good-form__add--active" : ''}`} onClick={toggleCartItem}>
                                        <Image src={`/static/images/shopping-cart${itemInCart ? "-white" : ""}.svg`} alt="basket icon" className="good-form-basket-icon" width={18} height={18}></Image>

                                        <span>Add to cart</span>
                                    </button>
                                </div>

                            </form>
                            <p className="good__hint">
                                {product.attributes.hint}
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 offset-sm-1 col-12">
                            <div className="good-desc">
                                {product.attributes.description.map(item => {
                                    return (
                                        <div key={item.id}>
                                            {item.text && <p className="good-desc__item">{item.text}</p>}
                                            {item.coloredList && <ul className="list-desc">
                                                {item.coloredList.split('\n').map((li, i) => {
                                                    return (
                                                        <li key={i} className="list-desc__item">
                                                            {li}
                                                        </li>
                                                    )
                                                })
                                                }
                                            </ul>}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default Item;