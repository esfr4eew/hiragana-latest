import axios from "axios";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import CheckoutForm from "../../components/checkout/CheckoutForm";
import Error from "../../components/Error"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Checkout() {
    const router = useRouter()
    const { id } = router.query
    const [data, setData] = useState(null);

    useEffect(() => {
        const getCheckout = async () => {
            const { data } = await axios.get(process.env.NEXT_PUBLIC_API_HOST + `/api/orders?filters[orderId][$eq]=${id}&populate[0]=coupons&populate[1]=Item&populate[2]=Item.shop_item`)
            setData(data.data[0])
        }
        id && getCheckout();
    }, [id])

    return (
        <div>
            <Header />
            {data ? <main>
                <div className="checkout">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h1 className="checkout__title">BILLING DETAILS</h1>
                            </div>
                        </div>
                        <CheckoutForm formData={data} total={data.attributes.totalPrice} products={data.attributes.Item} id={id} />
                        {/* {data && <Order total={data.attributes.totalPrice} products={data.attributes.Item} />} */}

                        {/* <div className="row">
                            <div className="col-sm-6 col-12">
                                <div className="order-confirm">
                                    <h1 className="checkout__title">PAYMENT METHOD</h1>
                                    <div className="order-confirm__header">
                                        <Image src="/static/images/paypal.png" alt="paypal logo" width={132} height={33}></Image>

                                        <a href="#" className="order-confirm__link">What is PayPal?</a>
                                    </div>
                                    <p className="order-confirm__desc">
                                        Make a payment using PayPal.
                                        <br />
                                        You can make a payment using you bank/credit card if you don’t have a PayPal account.
                                    </p>
                                    <button className="order-confirm__button" style={{ border: 'none' }} onClick={createOrder}>PROCEED TO PAYPAL</button>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </main> : <Error text="The order not found" />}
            <Footer />
        </div>
    );
}

export default Checkout;