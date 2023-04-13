import { useRef, useState } from "react";
import Order from "./Order";
import { toShip } from '../../http/order'
import { useRouter } from "next/router";
import { clearCart, initCartData } from "../../http/cart";
import { useCartContext } from "../../context/cartContext";
import axios from "axios";

function CheckoutForm({ formData, total, products, id }) {
    const { setCartData } = useCartContext();
    const router = useRouter()
    const firstName = useRef();
    const lastName = useRef();
    const company = useRef();
    const addr1 = useRef();
    const addr2 = useRef();
    const city = useRef();
    const country = useRef();
    const zip = useRef();
    const contact = useRef();
    const email = useRef();
    const additional = useRef();

    const [contactType, setContactType] = useState('Telegram');

    const handleContactTypeChange = (event) => {
        setContactType(event.target.value);
    }

    async function createOrder(event) {
        event.preventDefault();
        try {
            const data = {
                firstName: firstName?.current?.value || '',
                lastName: lastName?.current?.value || '',
                company: company?.current?.value || '',
                addr1: addr1?.current?.value || '',
                addr2: addr2?.current?.value || '',
                city: city?.current?.value || '',
                country: country?.current?.value || '',
                zip: zip?.current?.value || '',
                contact: contact?.current?.value ? contactType + ": " + contact?.current?.value : '',
                email: email?.current?.value || '',
                additional: additional?.current?.value || '',
                orderId: id
            }
            await toShip(data);
            await clearCart();
            const { cartData } = await initCartData();
            setCartData(cartData);
            await axios.post(`${process.env.NEXT_PUBLIC_BOT_HOST}/create`, data)
            router.push('/success');
        } catch (error) {
            console.log(error)
            alert('Ошибка при создании заявки')
        }
    }

    return (
        <form className="row checkout-form" onSubmit={createOrder}>
            <div className="col-sm-5 col-12">
                <div className="checkout-names">
                    <label className="checkout-form__item">
                        <div className="checkout-form__title">first name <span>*</span> </div>
                        <input type="text" className="checkout-form__input" required ref={firstName} />
                    </label>
                    <label className="checkout-form__item">
                        <div className="checkout-form__title">last name <span>*</span></div>
                        <input type="text" className="checkout-form__input" required ref={lastName} />
                    </label>
                </div>
                <div className="checkout-form__company">
                    <label className="checkout-form__item">
                        <div className="checkout-form__title">company</div>
                        <input type="text" className="checkout-form__input" ref={company} />
                    </label>
                </div>
                {/* <div className="checkout-form__coutry">
                    <div className="checkout-form__title">country <span>*</span></div>
                    <br />
                    <select className="checkout-form__input" required>
                        <option value="UA">Ukraine</option>
                        <option value="USA">USA</option>
                    </select>
                </div> */}
                <div className="checkout-form__street">
                    <label className="checkout-form__item">
                        <div className="checkout-form__title">street address <span>*</span> </div>
                        <input type="text" className="checkout-form__input checkout-form__input--address" placeholder="HOUSE NUMBER and STREET NAME" required ref={addr1} />
                        <input type="text" className="checkout-form__input checkout-form__input--address" placeholder="APPARTMENT, SUITE, UNIT, ETC  (OPTIONAL)" ref={addr2} />
                    </label>
                </div>
                <div className="checkout-form__city">
                    <label className="checkout-form__item">
                        <div className="checkout-form__title">town / city <span>*</span> </div>
                        <input type="text" className="checkout-form__input" required ref={city} defaultValue={formData?.attributes?.city} />
                    </label>
                </div>
                <div className="checkout-form__state">
                    <label className="checkout-form__item">
                        <div className="checkout-form__title">state / country <span>*</span> </div>
                        <input type="text" className="checkout-form__input" required ref={country} defaultValue={formData?.attributes?.country} />
                    </label>
                </div>
                <div className="checkout-form__code">
                    <label className="checkout-form__item">
                        <div className="checkout-form__title">postal / zip <span>*</span> </div>
                        <input type="text" className="checkout-form__input" required ref={zip} defaultValue={formData?.attributes?.zip} />
                    </label>
                </div>
                {/* <div className="checkout-form__tel">
                    <label className="checkout-form__item">
                        <div className="checkout-form__title">Phone <span>*</span> </div>
                        <input type="tel" className="checkout-form__input" required ref={phone} />
                    </label>
                </div> */}
                <div className="checkout-form__email">
                    <label className="checkout-form__item">
                        <div className="checkout-form__title">Email address <span>*</span> </div>
                        <input type="email" className="checkout-form__input" required ref={email} />
                    </label>
                </div>
            </div>

            <div className="col-sm-5 offset-sm-1 col-12">
                <div className="checkout-form__notes">
                    <label className="checkout-form__anotheraddr">
                        <input type="checkbox" />
                        <span className="checkout-form__title">Ship to a different address?</span>
                    </label>
                    <label className="checkout-form__area">
                        <div className="checkout-form__title">Order notes</div>
                        <textarea className="checkout-form__textarea" placeholder="NOTE ABOUT YOUR ORDER, e.g. special notes for delivery" ref={additional}></textarea>
                    </label>
                </div>
                <div>
                    <h1 className="checkout__title" style={{ marginTop: "30px", marginBottom: "15px" }}>YOUR Contact</h1>
                    <p className="checkout-form__title">Specify your contact for communication.</p>
                    <p className="checkout-form__title">We will contact you to confirm your order.</p>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", marginTop: "10px" }}>
                        <label style={{ width: "auto", marginRight: "8px", display: "flex", alignItems: "center" }}>
                            <input type="radio" name="contactType" value="Telegram" onChange={handleContactTypeChange} checked={contactType === 'Telegram'} />
                            <span className="checkout-form__title" style={{ marginBottom: 0, marginLeft: "3px" }} >Telegram</span>
                        </label>
                        <label style={{ width: "auto", marginRight: "8px", display: "flex", alignItems: "center" }}>
                            <input type="radio" name="contactType" value="Instagram" onChange={handleContactTypeChange} checked={contactType === 'Instagram'} />
                            <span className="checkout-form__title" style={{ marginBottom: 0, marginLeft: "3px" }} >Instagram</span>
                        </label>
                        <label style={{ width: "auto", marginRight: "8px", display: "flex", alignItems: "center" }}>
                            <input type="radio" name="contactType" value="Phone" onChange={handleContactTypeChange} checked={contactType === 'Phone'} />
                            <span className="checkout-form__title" style={{ marginBottom: 0, marginLeft: "3px" }} >Phone Number</span>
                        </label>
                        <input className="checkout-form__input checkout-form__input--address" type="text" placeholder={'Enter your ' + contactType} style={{ marginTop: "10px" }} required ref={contact} />
                    </div>
                </div>
            </div>
            <Order total={total} products={products} />
            <div className="row">
                <div className="col-sm-6 col-12">
                    <div className="order-confirm" style={{ marginTop: '40px' }}>
                        <button className="order-confirm__button" style={{ border: 'none' }} type="submit">PROCEED</button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default CheckoutForm;