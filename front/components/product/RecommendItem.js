import Link from 'next/link';
import { useEffect, useState } from 'react';
import CartButton from '../CartButton';
import { useCartContext } from "../../context/cartContext"
// import { editCart, updateRating } from "../../auth";
import { editCart } from "../../http/cart";
import { updateRating } from "../../http/rating";
import { useRatingContext } from "../../context/ratingContext";
import Image from 'next/future/image';

function RecommendItem({ item }) {
    const { userId, cartData, setCartData } = useCartContext();
    const [itemInCart, setItemInCart] = useState(false);
    const { rating, setRating } = useRatingContext()
    const [stars, setStars] = useState(0);

    useEffect(() => {
        setItemInCart(cartData?.cartItems.find(elem => elem.shop_item == item.id))
    }, [cartData, item.id])

    const addToCart = async () => {
        const el = { size: item.attributes.sizes[0].sizeShirt, quantity: 1, shop_item: item.id };
        const cartItems = cartData.cartItems.concat(el);
        setCartData({ ...cartData, cartItems })
        setItemInCart(true);
        await editCart(userId, cartData.cartId, cartItems)
    }

    useEffect(() => {
        if (rating && rating.rating.length) {
            const currentRating = rating.rating.find(r => r.shop_item === item.id);
            setStars(currentRating?.ratingValue);
        }
    }, [rating, item.id])


    const addRating = async (num) => {
        setStars(num);
        const newArray = rating.rating.find(el => el.shop_item === item.id) ? rating.rating : rating.rating.concat({ shop_item: item.id, ratingValue: num })
        const newState = { ...rating, rating: newArray.map(el => ({ ...el, ratingValue: el.shop_item === item.id ? num : el.ratingValue })) }
        setRating(newState)
        await updateRating(rating.id, newState.rating);
    }

    return (
        <div className="custom-carousel-item">
            <div className="category-item-container recommend-item-container">
                <div className="category-item recommend-item">
                    <Link href={`/products/${item.id}`}>
                        <div className="recomment-wrapper">
                            <div className="category-item__images">
                                {/* <img alt="car" src={process.env.NEXT_PUBLIC_API_HOST + item.attributes.logo.data.attributes.url} className="category-item__image category-item__image--active"></img> */}
                                <Image alt="car" src={process.env.NEXT_PUBLIC_API_HOST + item.attributes.logo.data.attributes.url} className="category-item__image category-item__image--active" width="1440" height="811"/>
                                {/* <Image src={process.env.NEXT_PUBLIC_API_HOST + item.attributes.logo.data.attributes.url} alt="car"
                                    className="category-item__image category-item__image--active" width={item.attributes.logo.data.attributes.width} height={item.attributes.logo.data.attributes.height}></Image> */}
                            </div>

                            <div className="category-item__name">{item.attributes.name}</div>
                        </div>
                    </Link>
                    {rating && <div className="category-item__rating">
                        <div className="category-item__stars">
                            {[1, 2, 3, 4, 5].map((num, i) => {
                                return (
                                    <div className="category-item__star" key={num} onClick={() => addRating(num)}>
                                        {/* <img src={`/static/images/${num <= stars ? "star-gold" : "star"}.png`} alt="" className="category-star-image"></img> */}
                                        <Image src={`/static/images/${num <= stars ? "star-gold" : "star"}.png`} alt="" className="category-star-image" width="13" height="13"></Image>
                                    </div>
                                )

                            })}
                        </div>
                        <span className="category-item__stat">({item.attributes.rating})</span>
                    </div>}
                    <div className="category-item__offer">
                        <div className="category-item__prices">
                            <div className="category-item__oldprice">{item.attributes.oldprice}</div>
                            <div className="category-item__price">{item.attributes.price}</div>
                        </div>
                        <CartButton itemInCart={itemInCart} addToCart={addToCart} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecommendItem;